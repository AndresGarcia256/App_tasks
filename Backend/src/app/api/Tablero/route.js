import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { BoardModel } from "@/models/Tablero.js";
import { handleApiError } from "@/utils/handleApiError";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";

export const GET = async (req , res) => {
    await connectDB();
    try {
      const userip = await getUserIP(req);
      await applyRateLimit(userip);
      const Board = await BoardModel.find({});
      return NextResponse.json({ data: Board }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
}
    

export const POST = async (req) => {
  await connectDB();
  try {
    const userip = await getUserIP(req);
    await applyRateLimit(userip, 2);
    const body = await req.json();
    const newBoard = await BoardModel.create(body);
    return NextResponse.json({ data: newBoard }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
};