import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
}, {
    timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);