import z from "zod";

export const loginSchema = z.object({
    email: z.string("Email address Required").email({ message: "Invalid email address" }),
    password: z.string("Password Required").min(6, { message: "Password must be at least 6 characters" }),
})
export type LoginSchema = z.infer<typeof loginSchema>


export const signupSchema = z.object({
    email: z.string("Email address Required").email({ message: "Invalid email address" }),
    username: z.string("Name Required").min(2, { message: "Name must be at least 2 characters" }),
    password: z.string("Password Required").min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string("Confirm Password Required").min(6, { message: "Password must be at least 6 characters" }),
})
export type SignupSchema = z.infer<typeof signupSchema>



export const categorySchema = z.object({
    name: z.string("Name Required").min(2, { message: "Name must be at least 2 characters" }),
    description: z.string("Description Required").min(10, { message: "Description must be at least 10 characters" }),
    image: z.string("Image URL Required").url({ message: "Invalid URL" }),
    parent: z.string("Parent Category ID Required").optional()
})
export type CategorySchema = z.infer<typeof categorySchema>


export const extraSchema = z.object({
    name: z.string("Name Required").min(2, { message: "Name must be at least 2 characters" }),
    price: z.number('Price should be a number').min(1, 'Price must be at least 1')
})
export type ExtraSchema = z.infer<typeof extraSchema>





export const handleErrors = <T>(zodError: z.ZodError<T>) => {
    const errors: Record<string, string[]> = {};

    zodError.issues.map(issue => {
        const path = issue.path.join('.')
        if (!errors[path]) {
            errors[path] = [];
        }
        errors[path].push(issue.message);
    })
    return errors
}