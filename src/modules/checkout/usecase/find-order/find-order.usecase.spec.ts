import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../invoice/domain/address.vo";
import Invoice from "../../../invoice/domain/invoice.entity";
import InvoiceFacadeFactory from "../../../invoice/factory/invoice.facade.factory";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import FindOrderUseCase from "./find-order.usecase";


const order = new Order({
    id: new Id("1"),
    client: new Client({
        id: new Id("1"),
        name: "Client 0",
        email: "client@user.com",
        address: "some address",
    }),
    products: [
        new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "some description",
            salesPrice: 40,
        }),
        new Product({
            id: new Id("2"),
            name: `Product 2`,
            description: "some description",
            salesPrice: 30,
        }),
    ],
    status: "approved"
})

const mockCheckoutRepository = {
    addOrder: jest.fn(),
    findOrder: jest.fn().mockResolvedValue(order),
};

describe("find order usecase unit test", () => {
    it("should find an order", async () => {
        const checkoultRepository = mockCheckoutRepository

        const input = {
            id: "1",
            invoiceId: "i1",
        }

        const inputInvoice = {
            id: "i1",
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

        const mockInvoiceFacade = {
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(inputInvoice)),
        };

        const usecase = new FindOrderUseCase(checkoultRepository, mockInvoiceFacade)
        const result = await usecase.execute(input)


        expect(result.id).toBeDefined();
        expect(checkoultRepository.findOrder).toHaveBeenCalled();
        expect(mockInvoiceFacade.find).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.find).toHaveBeenCalledWith("i1");
        expect(result.status).toBe(order.status)
        expect(result.total).toBe(70)
    })
});