import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { FindOrderFacadeInputDto, FindOrderFacadeOutputDto, PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export interface UseCasesProps {
    placeOrderUseCase: UseCaseInterface;
    findOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface
    private _findOrderUseCase: UseCaseInterface

    constructor(usecasesProps: UseCasesProps) {
        this._placeOrderUseCase = usecasesProps.placeOrderUseCase,
        this._findOrderUseCase = usecasesProps.findOrderUseCase
    }

    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return await this._placeOrderUseCase.execute(input)
    }

    async findOrder(input: FindOrderFacadeInputDto): Promise<FindOrderFacadeOutputDto> {
        return await this._findOrderUseCase.execute(input)
    }

}