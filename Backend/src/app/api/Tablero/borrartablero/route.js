import { BoardModel } from "@/models/Tablero";
import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";

function corsResponse(body, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
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

export async function DELETE(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return corsResponse({ error: "ID requerido" }, 400);
    }
    const deletedBoard = await BoardModel.findByIdAndDelete(id);
    if (!deletedBoard) {
      return corsResponse({ error: "Tablero no encontrado" }, 404);
    }
    return corsResponse({ data: deletedBoard }, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}