import { NextResponse } from "next/server";
import { userModel } from "@/models/User.js"; 
import connectDB from "@/app/lib/db.js";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";

import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const userip = await getUserIP(req);
  await applyRateLimit(userip);
  const { name, email, password } = await req.json();

  if (!password || password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe de tener minimo 6 caracteres" }, { status: 400 });
  }
  try {
    await connectDB();
    const emailfound = await userModel.findOne({ email });
    
    if (emailfound) {
        return NextResponse.json({ error: "El correo ya esta registrado" }, { status: 400 });
    }

    const hashpassword = await  bcrypt.hash(password, 10);

    const user = new userModel({
        name, 
        email,
        password:hashpassword
    });
    const SavedUser = await user.save(); 
    return NextResponse.json({
      email: SavedUser.email,
      name: SavedUser.name,
      id: SavedUser._id
    });
  }catch(error) {
    console.error("Credenciales invalidas:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: "Hubo un error a intentar registrarse" }, { status: 400 });
      }
  }
}   