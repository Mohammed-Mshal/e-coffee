export const parseError = (errors: string | Record<string, string[]> | null): string => {
    if (!errors) return 'An Error'
    if (typeof errors === 'string') return errors
    return Object.values(errors).flat().join(', ')
}