import { IProduct } from "@/types/product.types";
import { create } from "zustand";

type PopupProduct = {
    isOpen: boolean,
    product: IProduct | null,
    quantity: number,
    setProduct: (product: IProduct) => void,
    changeQuantity: (newQuantity: number) => void,
    togglePopup: (newState: boolean) => void,

}

export const usePopupProduct = create<PopupProduct>((set, get) => {
    return {
        isOpen: false,
        product: null,
        quantity: 1,
        extra_add: [],
        setProduct(product) {
            set({
                ...get(),
                product
            })
        },
        changeQuantity(newQuantity) {
            set({
                ...get(),
                quantity: newQuantity
            })
        },
        togglePopup(newState) {
            if (newState === false) {

                set({
                    ...get(),
                    product: null,
                    isOpen: newState
                })
            } else {
                set({
                    ...get(),
                    isOpen: newState
                })
            }
        },
    }
})