/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICart, ICartItem } from "@/types"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"; // ✅ Middleware
import { showToast } from 'nextjs-toast-notify'
import { wrapperFetch } from "@/utils/wrapperFetch";
type CartState = {
    cart: ICart,
    isLoading: boolean,
    error: string | null
}
type CartAction = {
    addToCart: (item: ICartItem) => Promise<void>,
    removeFromCart: (productId: string) => Promise<void>,
    clearCart: () => Promise<void>,
    initialCarts: () => Promise<void>
    // Selectors
    getTotalItems: () => number,
    getTotalPrice: () => number
}

const initialState = {
    cart: {
        _id: '',
        user: '',
        items: [],
        totalPrice: 0
    },
    isLoading: false,
    error: null
}

export const useCartState = create<CartState & CartAction>()(
    devtools(
        persist((set, get) => ({
            ...initialState,
            addToCart: async (item) => {
                set({ isLoading: true, error: null })
                try {
                    const res = await fetch('/api/carts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item),
                        credentials: 'include'
                    })
                    const data = await res.json();
                    if (!res.ok) {
                        showToast.error(data?.errors);
                        return
                    }
                    showToast.success('Item added to cart', {
                        sound: true
                    })
                    set((state) => {
                        return {
                            cart: {
                                ...state.cart,
                                items: [...state.cart.items, data]
                            }
                        }
                    })
                } catch (error: any) {
                    showToast.error(error ?? error, {
                        sound: true
                    })
                    set({ error: error ?? error });
                } finally {
                    set({ isLoading: false })
                }
            },
            initialCarts: async () => {
                try {
                    const res = await fetch(`/api/carts`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                    })
                    if (!res.ok) {
                        const data = await res.json();
                        showToast.error(data?.errors);
                        return
                    }
                    const { data } = await res.json();

                    set((state) => {
                        return {
                            cart: {
                                ...state.cart,
                                items: data.items
                            }
                        }
                    })
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            },
            clearCart: async () => {
                set({ isLoading: true, error: null })
                try {
                    const res = await fetch('/api/carts', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })
                    if (!res.ok) {
                        const data = await res.json();
                        showToast.error(data?.errors);
                        return
                    }
                    const { data } = await res.json()
                    showToast.success(data.message, {
                        sound: true
                    })
                    set((state) => {
                        return {
                            cart: {
                                ...state.cart,
                                items: []
                            }
                        }
                    })
                } catch (error: any) {
                    set({ error: error.message });

                } finally {
                    set({ isLoading: false })
                }
            },
            getTotalItems() {                
                return get().cart.items.reduce((total) => total + 1, 0)
            },
            getTotalPrice() {
                return get().cart.items.length
            },
            removeFromCart: async (productId: string) => {
                await wrapperFetch({
                    url: `/api/${productId}`,
                    method: 'DELETE',
                    showSuccessToast: true
                })
            }
        }), {
            name: 'cart-storage',
            partialize: (state) => ({ cart: state.cart }),
        })
        , {
            name: 'CartStore'
        }
    )
)