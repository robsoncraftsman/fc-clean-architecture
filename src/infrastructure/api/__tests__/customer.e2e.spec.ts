import { app } from '../express';
import request from 'supertest';
import CustomerModel from '../../customer/repository/sequelize/customer.model';
import { Sequelize } from 'sequelize-typescript';

describe('E2E test for customer', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a customer", async () => {
        const input = {
            name: "Maria",
            address: {
                street: "Rua das Flores",
                number: 123,
                zip: '88.888-888',
                city: 'Florianópolis'
            }
        };

        const response = await request(app).post("/customer").send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Maria");
        expect(response.body.address.street).toBe("Rua das Flores");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("88.888-888");
        expect(response.body.address.city).toBe("Florianópolis");
    });

    it('should not create a customer with an empty name', async () => {
        const input = { name: "" };

        const response = await request(app).post("/customer").send(input);

        expect(response.status).toBe(500);
    });
});