import { BoardModel } from "@/models/Tablero";
import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";

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

export async function POST(req) {
  const userip = await getUserIP(req);
  await applyRateLimit(userip);

  await connectDB();
  try {
    console.log("Conectado a la base de datos");
    console.log("Recibiendo datos del request", req.body);
    const body = await req.json();
    const newBoard = await BoardModel.create(body);
    return NextResponse.json({ data: newBoard }, { status: 200 });

  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}