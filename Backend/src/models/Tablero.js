// models/Board.js
import mongoose from "mongoose";
const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        color: {
            type: String,
            default: "#3B82F6"
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

boardSchema.index({ ownerId: 1 });
boardSchema.index({ members: 1 });
boardSchema.index({ isActive: 1 });

export const BoardModel = mongoose?.models?.Board || mongoose.model("Board", boardSchema);
