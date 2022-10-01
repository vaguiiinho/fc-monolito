import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/address.vo";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invoice.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) { }
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoice = new Invoice({
            id: new Id(input.id),
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map(
                (item) =>
                    new Product({
                        id: new Id(item.id),
                        name: item.name,
                        price: item.price,
                    })
            ),
        })
        await this.invoiceRepository.create(invoice)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,
        };
    }
}