import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const createCustomerRepositoryStub = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Update Customer Use Case - Unit Test', () => {
    it('should update a customer', async () => {
        const address = new Address("Rua do Mangue", 222, "88.888-888", "Florianópolis");
        const customer = CustomerFactory.createWithAddress("Pedro", address);

        const input: InputUpdateCustomerDTO = {
            id: customer.id,
            name: "Pedro Updated",
            address: {
                street: "Street Updated",
                number: 333,
                zip: "33.333-333",
                city: "City Updated"
            }
        };

        const customerRepository = createCustomerRepositoryStub();
        customerRepository.find = jest.fn().mockReturnValue(Promise.resolve(customer));

        const usecase = new UpdateCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        const expectedOutput: OutputUpdateCustomerDTO = {
            id: input.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        };

        expect(output).toEqual(expectedOutput);
    });
});