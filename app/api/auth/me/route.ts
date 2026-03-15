import { connectDB } from "@/lib/db";
import { updateCookies, verifySession } from "@/lib/session";
import { User } from "@/models/user";
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
    const isLoggedIn = await verifySession()
    if (!isLoggedIn) {
        return NextResponse.json(
            ErrorResponse("Unauthorized")
            , {
                status: 401
            }
        )
    }
    await connectDB()
    const userId = isLoggedIn?.userId
    let userInfo = null
    if (userId) {
        userInfo = await User.findById(userId).select("-password -__v").lean()
    }
    if (!userInfo) {
        return NextResponse.json(
            ErrorResponse("User not found"), {
            status: 404
        })
    }
    await updateCookies()
    return NextResponse.json(
        SuccessResponse("User info retrieved successfully", userInfo), {

        status: 200
    }
    )
})