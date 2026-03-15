import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IProductBase {
    name: string;
    description: string;
    price: number;
    category: {
        _id: string,
        name: string
    }[];
    stock: number;
    status: 'draft' | 'published' | 'archived';
    averageRating: number;
    reviewCount: number;
    images: string[];
    slug: string;
}

export interface IProduct extends IProductBase {
    _id: string;
    isInStock: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IProductDocument extends IProductBase, Document {
    _id: mongoose.Types.ObjectId;
    isInStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}
