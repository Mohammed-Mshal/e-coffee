import { ICartDocument, ICartItemDocument } from "@/types";
import mongoose, { Schema } from "mongoose";
export const cartItemSchema = new Schema<ICartItemDocument>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
})
cartItemSchema.virtual('totalPrice').get(function (this: ICartItemDocument) {
    return this.quantity * this.price
})

export const cartSchema = new Schema<ICartDocument>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
})
cartSchema.virtual('totalPrice').get(function (this: ICartDocument) {
    return this.items.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)
})
cartSchema.index({ user: 1 })
export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)


