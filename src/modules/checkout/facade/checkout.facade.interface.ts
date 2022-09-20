

export interface PlaceOrderFacadeInputDto {
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface PlaceOrderFacadeOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}

export interface FindOrderFacadeInputDto {
    id: string,
    invoiceId: string
}

export interface FindOrderFacadeOutputDto {
    id: string
    invoiceId: string
    status: string
    total: number
    products: {
        productId: string
    }[]
}

export default interface CheckoutFacadeInterface{
    placeOrder(input: PlaceOrderFacadeInputDto) : Promise<PlaceOrderFacadeOutputDto>
    findOrder(input: FindOrderFacadeInputDto) : Promise<FindOrderFacadeOutputDto>
}