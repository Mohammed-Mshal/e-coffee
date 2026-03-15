import { IProduct } from "@/types";
import { parseError } from "@/utils/parseError";
import { wrapperFetch } from "@/utils/wrapperFetch";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"; // ✅ Middleware

type ProductState = {
    isLoading: boolean,
    error: string | null,
    products: IProduct[]
}
type ProductAction = {
    initialProducts: () => Promise<void>,
    getProductsByCategory: (categoryName: string) => IProduct[],
    removeProduct: (productId: string) => Promise<void>,

}
const initialState = {
    products: [],
    isLoading: false,
    error: null
}
export const useProductStore = create<ProductState & ProductAction>()(
    devtools(
        persist((set, get) => ({
            ...initialState,
            getProductsByCategory: (categoryName: string) => {
                if (categoryName) {
                    return get().products.filter((product) => {
                        return product.category.some((cat) => {
                            return typeof cat === 'string' ?
                                cat === categoryName :
                                cat.name === categoryName
                        })
                    })
                }
                else {
                    return get().products
                }
            },
            initialProducts: async () => {
                set({ isLoading: true, error: null })
                const { data, success, errors } = await wrapperFetch<IProduct[]>({ url: '/api/products', method: 'GET' })
                if (data && success) {
                    set({
                        products: data
                    })
                } else {
                    set({ error: parseError(errors) ?? "An Error" })
                }
                set({ isLoading: false })
            },
            removeProduct: async (productId) => {
                
            },
        }), {
            name: 'product-store',
        })
        , {
            name: 'ProductStore',
        }
    )
)