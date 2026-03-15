import { verifySession } from "@/lib/session"
import { Cart } from "@/models/cart"
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse"
import { asyncWrapper } from "@/utils/asyncWrapper"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = asyncWrapper(async (req: NextRequest, ctx) => {
    const userInfo = await verifySession()
    if (!userInfo) {
        return NextResponse.json(
            ErrorResponse("Unauthorized", "User is not authenticated"),
            { status: 401 })
    }
    const { id } = await ctx?.params as { id: string }
    if (!id) {
        return NextResponse.json(
            ErrorResponse("Bad Request", "Item id is required"),
            { status: 400 })
    }
    const isCartItemExist = await Cart.findOne({
        user: userInfo.userId,
        'items._id': new mongoose.Types.ObjectId(id)

    })
    if (!isCartItemExist) {
        return NextResponse.json(
            ErrorResponse("Not Found", "Cart Item not found"),
            { status: 404 }
        )
    }
    const cart = await Cart.findOneAndUpdate({
        user: userInfo.userId
    }, {
        $pull: {
            items: {
                _id: id
            }
        }
    }, {
        returnDocument: 'after'
    })
    if (!cart) {
        return NextResponse.json(
            ErrorResponse("Not Found", "Cart Item not found"),
            { status: 404 })
    }
    return NextResponse.json(
        SuccessResponse('Cart Item cleared successfully', cart), {
        status: 200
    })
})