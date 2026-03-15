import mongoose from "mongoose";

export interface ICartItemBase {
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface ICartItem extends ICartItemBase {
    _id: string;
    product: string;
}

export interface ICartItemDocument extends ICartItemBase {
    _id: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
}

export interface ICartDocument extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<ICartItemBase>;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICart {
    _id: string;
    user: string;
    items: ICartItem[];
    totalPrice: number;
}