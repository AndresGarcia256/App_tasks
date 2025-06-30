import jwt from "jsonwebtoken";
import { BoardModel } from "@/models/Tablero";
import connectDB from "@/app/lib/db.js";

export async function Getboards(req) {
    await connectDB();

    
  
}