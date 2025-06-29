import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "El nombre es obligatorio"],
            minlength: [3, "El nombre debe tener al menos 3 caracteres"],
            maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
        },
        email: {
            type: String,
            required: [true, "El correo electrónico es obligatorio"],
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Por favor ingresa un correo electrónico válido"
            ]
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            minlength: 6,
            select: false 
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);


export const userModel = mongoose?.models?.User || mongoose.model("User", userSchema);