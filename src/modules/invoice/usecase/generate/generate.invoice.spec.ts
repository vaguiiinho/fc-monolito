import Id from "../../../@shared/domain/value-object/id.value-object"
import Address from "../../domain/address.vo"
import Product from "../../domain/product.entity"
import GenerateInvoiceUsecase from "./generate.invoice.usecase"

const MonckRepositury = () => {
    return {
        create: jest.fn(),
        find: jest.fn()
    }
}

describe("generate invoice usecase unit test", () => {
    it("shold generate an invoice", async () => {
        const invoiceRepository = MonckRepositury()
        const invoiceUsecase = new GenerateInvoiceUsecase(invoiceRepository)
        const input = {
            id: new Id("1"),
            name: "invoice 1",
            document: "document 1",
            street: "Rua Teste",
            number: "123",
            complement: "complemento",
            city: "Teste",
            state: "Teste",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "product 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "product 2",
                    price: 200
                }
            ]
        }

        const result = await invoiceUsecase.execute(input)

        expect(result.id).toBeDefined();
        expect(invoiceRepository.create).toHaveBeenCalled();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.total).toBe(300);
    })
})