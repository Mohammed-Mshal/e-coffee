import { deleteSession } from "@/lib/session";
import { SuccessResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (request: NextRequest) => {
    await deleteSession()
    return NextResponse.json(
        SuccessResponse("Logout Successful"), {
        status: 201
    })
})
