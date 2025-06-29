import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { userModel } from "@/models/User.js";
import { handleApiError } from "@/utils/handleApiError";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";
export const GET = async (req) => {
  await connectDB();
  try {
    const userip = await getUserIP(req);
    await applyRateLimit(userip);
    const students = await userModel.find({});
    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};

export const POST = async (req) => {
  await connectDB();
  try {
    const userip = await getUserIP(req);
    await applyRateLimit(userip, 2);
    const body = await req.json();
    const newStudents = await userModel.create(body);
    return NextResponse.json({ data: newStudents }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};