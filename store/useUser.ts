import { create } from "zustand";
export type User = {
    _id: string,
    username: string,
    email: string,
    address: string,
    number: string,
    birthday: Date,
    role: "admin" | "user",
    addresses: {
        street: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        isDefault: boolean,
    }[],
    wishlist: string[],

    // TODO: add Avatar Field
    // avatar:string,
}
export type UserState = {
    user: User | null | undefined,
    setUser: (user: User | null | undefined) => void,
    getUser: () => User | null | undefined,
}

export const useUser = create<UserState>((set, get) => {
    return {
        user: undefined,
        setUser: (user: User | null | undefined) => set({ user }),
        getUser: () => get().user,
    }
})