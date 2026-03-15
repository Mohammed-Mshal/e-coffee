import { connectDB } from "@/lib/db";
import { ratelimit } from "@/lib/ratelimit";
import { verifySession } from "@/lib/session";
import { categorySchema, handleErrors } from "@/lib/validators";
import { Category } from "@/models/category";
import { ErrorResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";


export const GET = asyncWrapper(async (request: NextRequest) => {

    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || 10
    const page = searchParams.get('page') || 1
    await connectDB()
    const categories = await Category.find({}).skip((Number(page) - 1) * Number(limit)).limit(Number(limit))
    return NextResponse.json({
        success: true,
        data: categories
    })
})

export const POST = asyncWrapper(async (request: NextRequest) => {
    const body = await request.json()
    const session = await verifySession()
    if (!session || session.role !== 'admin') {
        return NextResponse.json(
            ErrorResponse("Unauthorized"), {
            status: 401
        })
    }
    const isValidBody = await categorySchema.safeParseAsync(body)
    if (isValidBody.error) {
        const errors = handleErrors(isValidBody.error)
        return NextResponse.json(
            ErrorResponse("Validation failed", errors), {
            status: 400
        })
    }

    const { name, description, image, parent } = isValidBody.data
    await connectDB()

    const category = await Category.create({
        name,
        description,
        image,
        parent: parent || null
    })
    return NextResponse.json({
        success: true,
        data: category
    })
})