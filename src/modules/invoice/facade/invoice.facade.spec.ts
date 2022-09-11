import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceItemModel from "../repository/item.model";
import GenerateInvoiceUsecase from "../usecase/generate/generate.invoice.usecase";
import InvoiceFacade from "./invoice.facade";


describe("Invoice Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            InvoiceModel,
            InvoiceItemModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a new invoice", async () => {
        // const repository = new InvoiceRepository();
        // const usecase = new GenerateInvoiceUsecase(repository)
        // const facade = new InvoiceFacade({
        //     generateUseCase: usecase,
        //     findUseCase: undefined
        // })
        const facade = InvoiceFacadeFactory.create()
        const input = {
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
        const result = await facade.create(input)

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.total).toBe(
            input.items.reduce((acc, item) => acc + item.price, 0)
        );
    });

    it("should find an invoice", async () => {
        // const repository = new InvoiceRepository();
        // const usecase = new FindInvoiceUsecase(repository)
        // const facade = new InvoiceFacade({
        //     generateUseCase: undefined,
        //     findUseCase: usecase
        // })

        const facade = InvoiceFacadeFactory.create()
        const input = {
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
        const generate = await facade.create(input)
        const result = await facade.find(generate.id)

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.total).toBe(
            input.items.reduce((acc, item) => acc + item.price, 0)
        );
    });
});