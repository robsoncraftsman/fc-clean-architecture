import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const createCustomerRepositoryStub = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Find Customer Use Case - Unit Test', () => {
    it('should find a customer', async () => {
        const customer = new Customer("1", "João");
        const address = new Address("Rua das Flores", 123, "11.1111-111", "São Paulo");
        customer.changeAddress(address);

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

        const customerRepository = createCustomerRepositoryStub();
        customerRepository.find = jest.fn().mockReturnValue(Promise.resolve(customer));

        const usecase = new FindCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('should throw an excpetion if a customer does not exist', async () => {
        const input = {
            id: "1"
        };

        const customerRepository = createCustomerRepositoryStub();
        customerRepository.find = jest.fn(() => {
            throw new Error("Customer not found");
        });

        const usecase = new FindCustomerUseCase(customerRepository);
        expect(usecase.execute(input)).rejects.toThrowError("Customer not found");
    });
});