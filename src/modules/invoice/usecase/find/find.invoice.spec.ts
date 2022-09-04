import Id from "../../../@shared/domain/value-object/id.value-object"
import Address from "../../domain/address.vo"
import Invoice from "../../domain/invoice.entity"
import Product from "../../domain/product.entity"
import FindInvoiceUsecase from "./find.invoice.usecase"

const invoice = new Invoice({
    id: new Id("1"),
    name: "invoice 1",
    document: "document 1",
    address: new Address({
        street: "Rua Teste",
        number: "123",
        complement: "complemento",
        city: "Teste",
        state: "Teste",
        zipCode: "12345678",
    }),
    items: [
        new Product({
            id: new Id("1"),
            name: "product 1",
            price: 100
        }),
        new Product({
            id: new Id("2"),
            name: "product 2",
            price: 200
        })
    ]
})

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("find invoice usecase unit test", () => {
    it("shold find an invoice", async () => {
        const invoiceRepository = MockRepository()
        const usecase = new FindInvoiceUsecase(invoiceRepository)

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.total).toBe(300);
    })
})

