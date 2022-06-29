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

    it('should list all customers', async () => {
        const inputCreateCustomerOne = {
            name: "Maria",
            address: {
                street: "Rua das Flores",
                number: 123,
                zip: '88.888-888',
                city: 'Florianópolis'
            }
        };
        const responseCreateCustomerOne = await request(app).post("/customer").send(inputCreateCustomerOne);
        expect(responseCreateCustomerOne.status).toBe(200);


        const inputCreateCustomerTwo = {
            name: "João",
            address: {
                street: "Rua Buritis",
                number: 589,
                zip: '88.888-888',
                city: 'Florianópolis'
            }
        };
        const responseCreateCustomerTwo = await request(app).post("/customer").send(inputCreateCustomerTwo);
        expect(responseCreateCustomerTwo.status).toBe(200);

        const listCustomersResponse = await request(app).get("/customer").send();
        expect(listCustomersResponse.status).toBe(200);
        expect(listCustomersResponse.body.customers).toBeTruthy();
        expect(listCustomersResponse.body.customers.length).toBe(2);

        const customerOne = listCustomersResponse.body.customers[0];
        expect(customerOne).toEqual({ id: expect.any(String), ...inputCreateCustomerOne });

        const customerTwo = listCustomersResponse.body.customers[1];
        expect(customerTwo).toEqual({ id: expect.any(String), ...inputCreateCustomerTwo });
    });
});