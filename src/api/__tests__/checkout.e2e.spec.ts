import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.addModels([

        ]);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should a place order ", async () => {

        const responseClient = await request(app)
            .post("/client")
            .send({
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
            });

        expect(responseClient.status).toBe(200);
        expect(responseClient.body.id).toBe("1c");

        // const responseProduct = await request(app)
        //     .post("/product")
        //     .send({
        //         id: "1",
        //         name: "product 1",
        //         description: "product 1 description",
        //         purchasePrice: 100,
        //         stock: 10,
        //     });

        // expect(responseProduct.status).toBe(200);
        // expect(responseProduct.body.id).toBe("1");


        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1c",
                products: [{ productId: "1" }],
            });
        console.log(response.body)
    });
});