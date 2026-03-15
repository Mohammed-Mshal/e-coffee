import { verifySession } from "@/lib/session"
import { Product } from "@/models/product"
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse"
import { asyncWrapper } from "@/utils/asyncWrapper"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = asyncWrapper(async (req: NextRequest, ctx) => {
    const userInfo = await verifySession()
    if (!userInfo || userInfo.role !== 'admin') {
        return NextResponse.json({
            error: ErrorResponse("Unauthorized", "User is not authenticated"),
            data: null
        }, { status: 401 })
    }
    const { id } = await ctx?.params as { id: string }
    if (!id) {
        return NextResponse.json(
            ErrorResponse("Bad Request", "Product id is required"),
            { status: 400 })
    }
    const isProductItemExist = await Product.findOneAndDelete({
        _id: id
    })
    if (!isProductItemExist) {
        return NextResponse.json(
            ErrorResponse("Not Found", "Product Item not found"),
            { status: 404 }
        )
    }
    return NextResponse.json(
        SuccessResponse("Delete Successful!", "Delete Product Item Successfully"),
        { status: 200 }
    )
})

export const GET = asyncWrapper(async (req: NextRequest, ctx) => {
    const { id } = await ctx?.params as { id: string }
    if (!id) {
        return NextResponse.json(
            ErrorResponse("Bad Request", "Product id is required"),
            { status: 400 })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            ErrorResponse("Bad Request", "Invalid Product id"),
            { status: 400 }
        )
    }
    const isProductItemExist = await Product.findById(id)
        .populate('category', 'name')
    if (!isProductItemExist) {
        return NextResponse.json(
            ErrorResponse("Not Found", "Product Item not found"),
            { status: 404 }
        )
    }
    return NextResponse.json(
        SuccessResponse("Get Product Successfully!", isProductItemExist),
        { status: 200 }
    )
})