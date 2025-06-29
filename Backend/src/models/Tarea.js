import mongoose, { mongo } from "mongoose";
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        status: {
            type: String,
            enum: ["por_hacer", "en_progreso", "completada"],
            default: "por_hacer"
        },
        priority: {
            type: String,
            enum: ["baja", "media", "alta", "urgente"],
            default: "media"
        },
        dueDate: {
            type: Date
        },
        position: {
            type: Number,
            default: 0
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const TaskModel = mongoose?.models?.Task || mongoose.model("Task", taskSchema);