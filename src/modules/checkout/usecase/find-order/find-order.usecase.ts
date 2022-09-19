import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { FindOrderInputDto, FindOrderOutputDto } from "./find-order.dto";

export default class FindOrderUseCase implements UseCaseInterface {
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface

    constructor(
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
    ) {
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
    }

    async execute(input: FindOrderInputDto): Promise<FindOrderOutputDto> {
        const order = await this._repository.findOrder(input.id)
        const invoice = await this._invoiceFacade.find(input.invoiceId)
        return {
            id: order.id.id,
            invoiceId: invoice.id,
            status: order.status,
            total: order.total,
            products: order.products.map((product: any) => {
                return {
                    productId: product.id,

                }
            }),
        }
    }

}    