import { NextResponse } from "next/server";
import { userModel } from "@/models/User.js"; 
import connectDB from "@/app/lib/db.js";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";
import bcrypt from "bcryptjs";

function corsResponse(body, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Credentials": "true"
    }
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true"
    }
  });
}

export const POST = async (req) => {
  
  const userip = await getUserIP(req);
  await applyRateLimit(userip);

  const { name, email, password } = await req.json();

  if (!password || password.length < 6) {
    return corsResponse(
      { error: "La contraseña debe de tener minimo 6 caracteres" },
      400
    );
  }
  try {
    await connectDB();
    const emailfound = await userModel.findOne({ email });

    if (emailfound) {
      return corsResponse(
        { error: "El correo ya esta registrado" },
        400
      );
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashpassword
    });
    const SavedUser = await user.save();
    return corsResponse(
      {
        email: SavedUser.email,
        name: SavedUser.name,
        id: SavedUser._id
      },
      200
    );

  } catch (error) {
    console.error("Credenciales invalidas:", error);
    return corsResponse(
      { error: "Hubo un error a intentar registrarse" },
      400
    );
  }



};