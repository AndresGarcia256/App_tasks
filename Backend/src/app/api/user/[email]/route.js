import connectDB from "@/app/lib/db.js";
import { NextResponse } from "next/server";
import { userModel } from "@/models/User.js";
import { handleApiError } from "@/utils/handleApiError";
import { getUserIP } from "@/utils/GetUserIP";
import { applyRateLimit } from "@/utils/rateLimiter";


export const GET = async (req, { params }) => {
    await connectDB();
    try {
        const userip = await getUserIP(req);
        await applyRateLimit(userip);
        const id = (await params).email;
        const result = await userModel.findOne({ email: id });
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
        const result = await userModel.findByIdAndDelete(id);
        if (!result) {
            throw { status: 404, message: `No existe el id ${id}` };
        }
        return NextResponse.json({ message: `El id ${id} ha sido eliminado` }, { status: 201 });
    } catch (error) {
        retuhandleApiError(error);
    }
}


export const PUT = async (req, { params }) => {
    await connectDB();
    const id = (await params).id;
    const body = await req.json();
    try {
        const userip = await getUserIP(req);
        await applyRateLimit(userip);
        const result = await userModel.findByIdAndUpdate(id, {$set:{...body}}, { new: true });
        if (!result) {
        throw { status: 404, message: `No existe el id ${id}` };
        }
        return NextResponse.json({ message: `El id ${id} ha sido eliminado` }, { status: 201 });
        
    } catch (error) {
        return handleApiError(error);
    }
}