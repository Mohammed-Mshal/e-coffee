import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
            isDefault: {
                type: Boolean,
                default: false
            },
        }
    ],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: true // adds createdAt and updatedAt
});

// model export
export const User = mongoose.models.User || mongoose.model("User", userSchema);