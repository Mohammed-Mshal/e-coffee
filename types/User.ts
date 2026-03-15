import { Product } from "./product.types"

export type User = {
    _id: string,
    username: string
    number: string
    email: string
    password: string
    birthday: Date
    role: 'user' | 'admin'
    addresses: {
        street: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        isDefault: boolean
    }
    wishlist: Product[],
    updatedAt: Date,
    createdAt: Date
}