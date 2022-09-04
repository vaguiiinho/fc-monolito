import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find.invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) { }
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    }
}