import { app, sequelize } from "../express";
import request from "supertest";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.addModels([
            InvoiceModel,
        ]);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should find a invoice", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                id: "1",
                name: "invoice 1",
                document: "document 1",
                street: "Rua Teste",
                number: "123",
                complement: "complement 1",
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
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("invoice 1");
        expect(response.body.document).toBe("document 1");
        expect(response.body.street).toBe("Rua Teste");
        expect(response.body.number).toBe("123");
        expect(response.body.complement).toBe("complement 1");
        expect(response.body.city).toBe("Teste");
        expect(response.body.state).toBe("Teste");
        expect(response.body.zipCode).toBe("12345678");
        expect(response.body.items[0].name).toBe("product 1");
        expect(response.body.items[0].price).toBe(100);
        expect(response.body.items[1].name).toBe("product 2");
        expect(response.body.items[1].price).toBe(200);

        const listResponse = await request(app).get("/invoice/1").send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.name).toBe("invoice 1");
        expect(listResponse.body.document).toBe("document 1");
        expect(listResponse.body.address.street).toBe("Rua Teste");
        expect(listResponse.body.address.number).toBe("123");
        expect(listResponse.body.address.complement).toBe("complement 1");
        expect(listResponse.body.address.city).toBe("Teste");
        expect(listResponse.body.address.state).toBe("Teste");
        expect(listResponse.body.address.zipCode).toBe("12345678");
        expect(listResponse.body.items[0].name).toBe("product 1");
        expect(listResponse.body.items[0].price).toBe(100);
        expect(listResponse.body.items[1].name).toBe("product 2");
        expect(listResponse.body.items[1].price).toBe(200);
    });
});