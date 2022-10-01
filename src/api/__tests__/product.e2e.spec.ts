import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "product 1",
                description: "product 1 description",
                purchasePrice: 100,
                stock: 10,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("product 1");
        expect(response.body.description).toBe("product 1 description");
        expect(response.body.purchasePrice).toBe(100);
        expect(response.body.stock).toBe(10);
    });
});