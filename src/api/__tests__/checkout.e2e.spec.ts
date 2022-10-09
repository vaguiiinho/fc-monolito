import { app, sequelize } from "../express";
import request from "supertest";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";


describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
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

        const product = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(product);

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1c",
                products: [{ productId: "1" }],
            });
        console.log(response.body)
    });
});