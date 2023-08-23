export const timeTranslate = (At: string): string => {
    return new Date(At).toISOString().replace('-', ' ').split('T')[0].replace('-', ' ')
}