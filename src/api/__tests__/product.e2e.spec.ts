import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("E2E test for product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            ProductModel
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
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