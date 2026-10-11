import { create } from "zustand";

type AuthStore = {
	modal: "login" | "register" | null;
	openLogin: () => void;
	openRegister: () => void;
	closeModal: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	modal: null,
	openLogin: () => set({ modal: "login" }),
	openRegister: () => set({ modal: "register" }),
	closeModal: () => set({ modal: null }),
}));
