import { NextResponse } from "next/server";
import { userModel } from "@/models/User.js"; 
import connectDB from "@/app/lib/db.js";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const { email, password } = await req.json();

  if (!email || !password) {
    return corsResponse(
      { error: "Email y contraseña son requeridos" },
      400
    );
  }
  try {
    await connectDB();
    const user = await userModel.findOne({ email }).select("+password"); // Asegúrate de incluir el campo de contraseña

    if (!user) {
      return corsResponse(
        { error: "Usuario no encontrado" },
        400
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return corsResponse(
        { error: "Contraseña incorrecta" },
        400
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "secreto", // Usa una variable de entorno segura en producción
      { expiresIn: "10h" }
    );

    const response = corsResponse(
      {
        email: user.email,
        name: user.name,
        id: user._id
      },
      200
    );
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 10}; SameSite=Lax`
    );
    return response;

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return corsResponse(
      { error: "Hubo un error al intentar iniciar sesión" },
      400
    );
  }
};