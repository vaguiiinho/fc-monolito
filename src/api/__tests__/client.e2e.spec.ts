import { app, sequelize } from "../express";
import request from "supertest";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.addModels([
            ClientModel,
        ]);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/client")
            .send({
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

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("x@x.com");
        expect(response.body.document).toBe("123456789");
        expect(response.body.street).toBe("Address 1");
        expect(response.body.number).toBe("1");
        expect(response.body.complement).toBe("Complement 1");
        expect(response.body.city).toBe("City 1");
        expect(response.body.state).toBe("State 1");
        expect(response.body.zipCode).toBe("ZipCode 1");
    });
});