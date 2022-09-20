import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-adm/factory/facade.factory";
import Product from "../domain/product.entity";
import CheckoutRepository from "../repository/checkout.repository";
import ClientModel from "../repository/client.model";
import OrderModel from "../repository/order.model";
import ProductModel from "../repository/product.model";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacade from "./checkout.facade";

describe("Checkout Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            OrderModel,
            ProductModel,
            ClientModel
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should place a new order", async () => {
        const repository = new CheckoutRepository()
        const clientProps = {
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        const mockClientFacade = {
            find: jest.fn().mockResolvedValue(clientProps),
        }

        const products = {
            "1": new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "some description",
                salesPrice: 40,
            }),
            "2": new Product({
                id: new Id("2"),
                name: `Product 2`,
                description: "some description",
                salesPrice: 30,
            }),
        };

        const mockPaymentFacade = {
            process: jest.fn(),
        };

        const mockInvoiceFacade = {
            create: jest.fn().mockResolvedValue({ id: "1i" }),
        };

        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amount: 100,
            status: "error",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const placeOrderUseCase = new PlaceOrderUseCase(
            mockClientFacade as any,
            null,
            null,
            repository,
            mockInvoiceFacade as any,
            mockPaymentFacade as any
        )

        const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null);

        const mockGetProduct = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "getProduct")
            //@ts-expect-error - spy on private method
            .mockImplementation((productId: keyof typeof products) => {
                return products[productId];
            });


        const checkoutFacade = new CheckoutFacade({
            placeOrderUseCase: placeOrderUseCase,
            findOrderUseCase: undefined
        })

        const input = {
            clientId: "1c",
            products: [{ productId: "1" }, { productId: "2" }],

        }

        const result = await checkoutFacade.placeOrder(input)
        //     expect(result).toBeDefined();
        //     expect(result.id).toBeDefined();
        //     expect(result.products).toStrictEqual([
        //         { productId: "1" },
        //         { productId: "2" },
        //     ]);
    })
})