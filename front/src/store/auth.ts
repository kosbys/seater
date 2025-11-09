import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	requestLogin,
	requestLogout,
	requestRefresh,
	requestRegister,
} from "@/api/api";

type User = {
	username: string;
};

interface AuthState {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refresh: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			loading: false,
			user: null,

			login: async (username: string, password: string) => {
				set({ loading: true });
				try {
					const res = await requestLogin(username, password);
					console.log("Successful login", res);
					set({ user: res.user });
				} catch (error) {
					console.error("Login error", error);
					throw error;
				} finally {
					set({ loading: false });
				}
			},

			register: async (username: string, password: string) => {
				set({ loading: true });
				try {
					const res = await requestRegister(username, password);
					console.log("Successful register", res);
					set({ user: res.user });
				} catch (error) {
					console.error("Register error", error);
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			logout: async () => {
				set({ loading: true });
				try {
					const res = await requestLogout();
					console.log("Successful logout", res);
					set({ user: null });
				} catch (error) {
					console.error("Logout error", error);
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			refresh: async () => {
				set({ loading: true });
				try {
					const res = await requestRefresh();
					console.log("Successful refresh", res);
				} catch (error) {
					console.error("Refresh error", error);
					set({ user: null });
					throw error;
				} finally {
					set({ loading: false });
				}
			},
		}),
		{ name: "auth-state" },
	),
);

export { useAuthStore };
