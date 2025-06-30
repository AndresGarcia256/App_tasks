import { BoardModel } from "@/models/Tablero";
import connectDB from "@/app/lib/db.js";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";
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

export async function GET(req) {
  await connectDB();
  try {
    
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    if (!userId) {
      return corsResponse({ error: "Falta el parámetro id" }, 400);
    }
    const userBoards = await BoardModel.find({
      $or: [
        { ownerId: userId },
        { members: userId }
      ]
    });
    return corsResponse(userBoards, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}