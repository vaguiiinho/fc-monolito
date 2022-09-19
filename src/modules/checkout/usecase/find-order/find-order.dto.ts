export interface FindOrderInputDto {
    id: string,
    invoiceId: string
}

export interface FindOrderOutputDto {
    id: string
    invoiceId: string
    status: string
    total: number
    products: {
        productId: string
    }[]
}