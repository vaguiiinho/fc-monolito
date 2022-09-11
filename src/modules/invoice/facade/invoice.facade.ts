import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.interface";

export interface UseCasesProps {
    generateUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._generateUseCase = usecasesProps.generateUseCase;
        this._findUseCase = usecasesProps.findUseCase;
    }
    async create(
        input: GenerateInvoiceFacadeInputDto
    ): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute(input);
    }

    async find(invoiceId: string): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUseCase.execute({ id: invoiceId });
    }
}