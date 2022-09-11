export interface GenerateInvoiceFacadeInputDto {
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
        id: string
        name: string
        price: number
    }[]
}

export interface GenerateInvoiceFacadeOutputDto {
    id: string
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
        id: string
        name: string
        price: number
    }[]
    total: number
}

export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}

export default interface InvoiceFacadeInterface {
    create(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>
    find(id: string): Promise<FindInvoiceFacadeOutputDTO>
}