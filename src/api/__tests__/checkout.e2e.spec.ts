import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { ClientModel as OrderClientModel } from "../../modules/checkout/repository/client.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import ProductModel from "../../modules/checkout/repository/product.model";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/facade.factory";
import { ClientModel as AdmClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/item.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { ProductModel as AdmProductModel } from "../../modules/product-adm/repository/product.model";
import { ProductModel as StoreProductModel } from "../../modules/store-adm/repository/product.model";
import ProductRepository from "../../modules/store-adm/repository/product.repository";
import { app } from "../express";

describe("E2E test for checkout", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            OrderClientModel,
            OrderModel,
            ProductModel,
            AdmClientModel,
            AdmProductModel,
            StoreProductModel,
            TransactionModel,
            InvoiceModel,
            InvoiceItemModel
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should a place order ", async () => {

        const clientFacade = ClientAdmFacadeFactory.create()
        const productFacade = ProductAdmFacadeFactory.create()

        const client = {
            id: "1c",
            name: "Client 1",
            email: "x@x.com",
            document: "123456789",
            street: "Address 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
        };

        await clientFacade.add(client)
        const clientResult = await clientFacade.find({ id: "1c" });
        expect(clientResult.id).toBe(client.id);


        const product = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(product);
        const result = await productFacade.checkStock({ productId: "1" });
        expect(result.productId).toBe(product.id);


        await StoreProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });


        const productRepository = new ProductRepository();
        const productStore = await productRepository.find("1");
        expect(productStore.id.id).toBe("1");

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1c",
                products: [{ productId: "1" }],
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceId).toBeDefined()
        expect(response.body.status).toBe("approved")
        expect(response.body.total).toBe(100)
        expect(response.body.products.length).toBe(1)
        expect(response.body.products[0].productId).toBe("1")
    });
});