import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { TaskModel } from "@/models/Tarea.js";
import { handleApiError } from "@/utils/handleApiError";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";


export const GET = async (req , res) => {
    await connectDB();
    try {
      const userip = await getUserIP(req);
      await applyRateLimit(userip, 2);
      const Task = await TaskModel.find({});
      return NextResponse.json({ data: Task }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
}
    

export const POST = async (req) => {
  await connectDB();
  try {
    const userip = await getUserIP();
    await applyRateLimit(userip, 2);
    const body = await req.json();
    const newTask = await TaskModel.create(body);
    return NextResponse.json({ data: newTask }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};