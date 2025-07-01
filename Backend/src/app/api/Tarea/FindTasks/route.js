import { TaskModel } from "@/models/Tarea";
import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
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
    const body = await req.json();
    const { search, ownerId } = body;
    const createdBy = ownerId;
    let query = {};

    if (search && search.trim() !== "") {
      query.title = { $regex: search, $options: "i" };
    }
    console.log(createdBy);
    if (createdBy && createdBy.length === 5) {
      query.createdBy = { $in: [new ObjectId(createdBy)] };
    }

    const tasks = await TaskModel.find(
      {
        title: { $regex: search, $options: "i" },
        createdBy: createdBy
      }
    );
    console.log(tasks);
    return corsResponse({ response: tasks }, 200);
  } catch (error) {
    return corsResponse({ error: error.message || "Error interno" }, 500);
  }
}