import { connectDB } from "@/lib/db";
import { handleErrors, signupSchema } from "@/lib/validators";
import { User } from "@/models/user";
import { ErrorResponse, SuccessResponse } from "@/utils/apiResponse";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import { User as UserType } from "@/types/User";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export const POST = asyncWrapper(async (request: NextRequest) => {
    const body = await request.json()
    const isValidBody = await signupSchema.safeParseAsync(body)
    if (!isValidBody.success) {
        const errors = handleErrors(isValidBody.error)

        return NextResponse.json(
            ErrorResponse("Validation failed", errors), {
            status: 400
        })
    }
    const { email, username, password, confirmPassword } = isValidBody.data
    await connectDB()
    const user = await User.findOne<UserType | null>({ email }).exec()
    if (user) {
        return NextResponse.json(
            ErrorResponse("Email already exists"), {
            status: 400
        })
    }
    if (password !== confirmPassword) {
        return NextResponse.json(
            ErrorResponse("Passwords do not match"), {
            status: 400
        })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    await createSession(newUser._id.toString(), newUser.role)
    return NextResponse.json(
        SuccessResponse("Signup successful", {
            userId: newUser._id,
        }), {
        status: 201
    })
})
