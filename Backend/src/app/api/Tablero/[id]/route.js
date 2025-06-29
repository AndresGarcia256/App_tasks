import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { BoardModel } from "@/models/Tablero.js";
import { handleApiError } from "@/utils/handleApiError";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";
// ...existing code...

export const GET = async (req, { params }) => {
    await connectDB();
    const id = (await params).id;
    try {
        const userip = await getUserIP(req);
        await applyRateLimit(userip);
        const result = await BoardModel.findById(id);
        return NextResponse.json({ data: result }, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}

export const DELETE = async (req, { params }) => {
    await connectDB();
    const id = (await params).id;
    try {
        const userip = await getUserIP(req);
        await applyRateLimit(userip);
        const result = await BoardModel.findByIdAndDelete(id);
        if (!result) {
            throw { status: 404, message: `No existe el id ${id}` };
        }
        return NextResponse.json({ message: `El id ${id} ha sido eliminado` }, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}

export const PUT = async (req, { params }) => {
    await connectDB();
    const id = (await params).id;
    const body = await req.json();
    try {
        const userip = await getUserIP(req);
        await applyRateLimit(userip);
        const result = await BoardModel.findByIdAndUpdate(id, { $set: { ...body } }, { new: true });
        if (!result) {
            throw { status: 404, message: `No existe el id ${id}` };
        }
        return NextResponse.json({ message: `El id ${id} ha sido eliminado` }, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
