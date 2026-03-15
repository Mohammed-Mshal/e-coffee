import { connectDB } from "@/lib/db";
import { handleErrors, loginSchema, LoginSchema } from "@/lib/validators";
import { User } from "@/models/user";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse";
import { createSession } from "@/lib/session";
import { User as UserType } from "@/types/User";


export const POST = asyncWrapper(async (request: NextRequest) => {
    const body: LoginSchema = await request.json()
    const isValidBody = await loginSchema.safeParseAsync(body)
    if (isValidBody.error) {
        const errors = handleErrors(isValidBody.error)
        return NextResponse.json(
            ErrorResponse("Validation failed", errors), {
            status: 400
        })
    }
    const { email, password } = isValidBody.data
    await connectDB()
    const user = await User.findOne<UserType | null>({ email }).exec()
    if (!user) {
        return NextResponse.json(
            ErrorResponse("Email not found"), {
            status: 401
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return NextResponse.json(
            ErrorResponse("Invalid password"), {
            status: 401
        })
    }
    await createSession(user._id.toString(), user.role)
    return NextResponse.json(
        SuccessResponse("Login successful", {
            userId: user._id,
        }), {
        status: 201
    })
})