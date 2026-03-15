import { connectDB } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Product } from "@/models/product";
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (req: NextRequest) => {
    const userInfo = await verifySession()
    if (!userInfo || !userInfo.userId || userInfo.role !== 'admin') {
        return NextResponse.json({
            error: ErrorResponse("Unauthorized", "User is not authenticated or does not have admin privileges"),
            data: null
        }, { status: 401 })
    }
    const formData = await req.formData()
    const name = formData.get("name") as string
    const price = Number(formData.get("price"))
    const description = formData.get("description") as string
    const stock = formData.get("stock") as string
    const image = formData.get("image") as string
    if (!name || !price || !description || !stock) {
        return NextResponse.json({
            error: ErrorResponse("Bad Request", "All product fields are required"),
            data: null
        }, { status: 400 })
    }


    // handle images as files not string




    // ----------------------
    await connectDB()
    const newProduct = await Product.create({
        name,
        price,
        description,
        image,
        stock
    })
    return NextResponse.json(
        SuccessResponse('Product created successfully', newProduct), {
        status: 201
    })
})

export const GET = asyncWrapper(async (req: NextRequest) => {
    const page = parseInt(req.nextUrl.searchParams.get("page") || '1');
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || '10');
    const skip = (page - 1) * limit;
    await connectDB()
    const products = await Product.find({}).select('-__v').lean().skip(skip).limit(limit)
    return NextResponse.json(
        SuccessResponse('Products retrieved successfully', products), {
        status: 200
    })
})
