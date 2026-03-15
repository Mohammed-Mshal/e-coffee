import { ICartItem, IProduct } from "@/types";

export const toCartItem = (product: IProduct, quantity: number): ICartItem => ({
    _id: product._id,
    product: product._id,
    price: product.price,
    quantity,
    totalPrice: product.price * quantity
})