import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

const createCustomerRepositoryStub = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Create Customer Use Case - Unit Test', () => {
    it('should create a customer', async () => {
        const input: InputCreateCustomerDTO = {
            name: "Maria",
            address: {
                street: "Av. Santa Mônica",
                number: 123,
                zip: "11.111-111",
                city: "Florianópolis"
            }
        };

        const expectedOutput: OutputCreateCustomerDTO = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        };

        const customerRepository = createCustomerRepositoryStub();
        const usecase = new CreateCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('should create a customer', async () => {
        const input: InputCreateCustomerDTO = {
            name: "",
            address: {
                street: "Av. Santa Mônica",
                number: 123,
                zip: "11.111-111",
                city: "Florianópolis"
            }
        };

        const customerRepository = createCustomerRepositoryStub();
        const usecase = new CreateCustomerUseCase(customerRepository);

        expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });
});