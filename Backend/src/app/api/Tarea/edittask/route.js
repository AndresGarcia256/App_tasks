import { TaskModel } from "@/models/Tarea";
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

// Crear nueva tarea
export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const newTask = await TaskModel.create(body);
    return corsResponse({ data: newTask }, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}

// Modificar tarea existente
export async function PUT(req) {
  const userip = await getUserIP(req);
  await applyRateLimit(userip);

  await connectDB();
  try {
    const body = await req.json();
    const { _id, ...updateFields } = body;
    if (!_id) {
      return corsResponse({ error: "Falta el _id de la tarea." }, 400);
    }
    const updatedTask = await TaskModel.findByIdAndUpdate(_id, updateFields);
    if (!updatedTask) {
      return corsResponse({ error: "Tarea no encontrada." }, 404);
    }
    return corsResponse({ data: updatedTask }, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}