import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find.invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate/generate.invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUsecase(repository);
        const findUseCase = new FindInvoiceUsecase(repository);

        return new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });
    }
}