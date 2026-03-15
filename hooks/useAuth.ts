/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "@/i18n/routing"
import { useUser } from "@/store/useUser"
import { useState } from "react";

export const useAuth = () => {
    const router = useRouter()
    const [serverError, setServerError] = useState("");
    const { setUser } = useUser()
    const logout = async () => {
        try {
            const res = await fetch(`/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const resData = await res.json()
            if (!res.ok) {
                setServerError(resData.error || "Logout failed");
                return;
            }
            setUser(null)
            router.push('/auth/login')
        } catch (error: any) {
            console.error('Logout failed:', error)
            setServerError(error.response?.data?.error || "Something went wrong");
        }
    }
    const login = async (data: { email: string, password: string }) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const errorData = await res.json();
                setServerError(errorData.error || "Something went wrong");
                return;
            }
            router.push("/");
        } catch (err: any) {
            setServerError(err.response?.data?.error || "Something went wrong");
        }
    }
    const signup = async (data: { username: string, email: string, password: string, confirmPassword: string }) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const errorData = await res.json();
                setServerError(errorData.error || "Something went wrong");
                return;
            }
            router.push("/auth/login");
        } catch (err: any) {
            setServerError(err.response?.data?.error || "Something went wrong");
        }
    }
    return {
        logout,
        login,
        signup,
        serverError,
    }
}