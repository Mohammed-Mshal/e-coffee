/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
    success: boolean,
    message: string,
    data?: T,
    errors?: Record<string, string[]>
}

export const SuccessResponse = <T>(message: string, data?: T): ApiResponse<T> => {
    return {
        success: true,
        message,
        data
    }
}
export const ErrorResponse = (message: string, errors?: any): ApiResponse => {
    return {
        success: false,
        message,
        errors
    }
}