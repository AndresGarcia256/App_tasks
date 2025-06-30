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
  try {
    // Crea la respuesta base
    const response = corsResponse(
      { message: "Sesión cerrada correctamente" },
      200
    );
    // Borra la cookie 'token' enviando una cookie expirada
    response.headers.append(
      "Set-Cookie",
      "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
    );
    return response;

  } catch (error) {
    console.error("Error al cerrar sesion:", error);
    return corsResponse(
      { error: "Hubo un error al intentar cerrar la sesion" },
      400
    );
  }
};