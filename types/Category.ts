export type Category = {
    _id: string,
    name: string,
    description: string,
    image: string,
    parent?: Category,
    createdAt: Date,
    updatedAt: Date
}