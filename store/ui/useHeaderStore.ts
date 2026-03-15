import { create } from "zustand";

type HeaderStore = {
    isOpen: boolean;
    toggle: () => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))