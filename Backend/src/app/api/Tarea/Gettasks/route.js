import { TaskModel } from "@/models/Tarea";
import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";


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
    const boardId = searchParams.get('id');
    if (!boardId) {
      return corsResponse({ error: "Falta el parámetro id" }, 400);
    }
    console.log("Obteniendo tareas para el tablero:", boardId);

    const userBoards = await TaskModel.find({boardId: boardId});

    console.log("Tareas encontradas:", userBoards);
    return corsResponse({ data: userBoards }, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}