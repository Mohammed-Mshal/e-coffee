/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
    const userInfo = await verifySession()
    if (!userInfo || !userInfo.userId) {
        return NextResponse.json({
            error: ErrorResponse("Unauthorized", "User is not authenticated"),
            data: null
        }, { status: 401 })
    }
    const userId = userInfo.userId

    await connectDB()
    let cart = await Cart.findOne({
        user: userId
    })
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        })
    }
    await cart.save()
    return NextResponse.json(
        SuccessResponse('Cart items retrieved successfully', cart), {
        status: 200
    })
})

export const POST = asyncWrapper(async (req: NextRequest) => {
    const userInfo = await verifySession()
    if (!userInfo || !userInfo.userId) {
        return NextResponse.json(ErrorResponse("Unauthorized", "User is not authenticated"),
            { status: 401 })
    }
    const userId = userInfo.userId
    const { _id, quantity } = await req.json()
    if (!_id || !quantity) {
        return NextResponse.json(
            ErrorResponse("Bad Request", "Product ID and quantity are required"),
            { status: 400 })
    }
    await connectDB()
    const product = await Product.findById(_id);
    if (!product) return NextResponse.json(ErrorResponse("Not Found", "Product not found"), { status: 404 });
    if (product.stock < quantity) return NextResponse.json(ErrorResponse("Insufficient Stock", "Product quantity not available"), { status: 400 });
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        })
    }


    const existingItem = cart.items.find((item: any) => item.product.toString() === _id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: _id,
            quantity,
            price: product?.price,
        })
    }
    await cart.save()
    return NextResponse.json(
        SuccessResponse('Cart item added successfully', cart), {
        status: 201
    })
})

export const DELETE = asyncWrapper(async (req: NextRequest) => {
    const userInfo = await verifySession()
    if (!userInfo) {
        return NextResponse.json({
            error: ErrorResponse("Unauthorized", "User is not authenticated"),
            data: null
        }, { status: 401 })
    }
    const cart = await Cart.findOneAndUpdate({
        user: userInfo.userId
    }, {
        $set: {
            items: []
        }
    }, {
        new: true
    })
    if (!cart) {
        return NextResponse.json({
            error: ErrorResponse("Not Found", "Cart not found"),
            data: null
        }, { status: 404 })
    }
    return NextResponse.json(
        SuccessResponse('Cart cleared successfully', { items: [] }), {
        status: 200
    })
})