/* eslint-disable @typescript-eslint/no-explicit-any */
import { showToast } from "nextjs-toast-notify"
type FetchOptions = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    showSuccessToast?: boolean
}
type FetchResponse<T> = {
    data: T | null,
    errors: string | Record<string, string[]> | null,
    success: boolean
}
export const wrapperFetch = async <T = unknown>({
    url,
    method,
    body,
    showSuccessToast
}: FetchOptions): Promise<FetchResponse<T>> => {
    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: method !== 'GET' ? JSON.stringify(body) : undefined
        })
        const json = await res.json()
        if (!res.ok) {
            return json?.errors
        }
        if (showSuccessToast && json?.message) {
            showToast.success(json.message, { sound: true })
        }
        return json
    } catch (error: any) {
        return {
            data: null,
            errors: error instanceof Error ? error.message : 'An unexpected error occurred',
            success: false
        }
    }
}