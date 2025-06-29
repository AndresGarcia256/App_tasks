import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const { name, email, password } = body;
    return NextResponse.json({ message: "Register" });
}   