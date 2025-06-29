import { NextResponse } from "next/server";

export function handleApiError(error) {
    if (error.status === 404) {
        return NextResponse.json({ error: error.message || "No encontrado" }, { status: 404 });
    }
    if (error.status === 429) {
        return NextResponse.json({ error: "Demasiadas peticiones" }, { status: 429 });
    }
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: "Datos inválidos", detalles: error.errors }, { status: 400 });
    }
    // Error genérico
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
}