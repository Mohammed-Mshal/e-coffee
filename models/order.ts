import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
});

export const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "paid", "shipped", "completed", "cancelled"],
            message: "{VALUE} is not a valid status"
        },
        default: "pending",
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        default: ""
    },
    paymentInfo: {
        id: String,
        provider: String,
        status: String,
        paidAt: Date,
        deliveredAt: Date,
    },
}, {
    timestamps: true,
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);