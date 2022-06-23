import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find Customer Use Case - Integration Test', () => {
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

    it('should find a customer', async () => {
        const customer = new Customer("1", "João");
        const address = new Address("Rua das Flores", 123, "11.1111-111", "São Paulo");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const input = {
            id: "1"
        };

        const expectedOutput = {
            id: "1",
            name: "João",
            address: {
                street: "Rua das Flores",
                city: "São Paulo",
                number: 123,
                zip: "11.1111-111"
            }
        };

        const usecase = new FindCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });
});