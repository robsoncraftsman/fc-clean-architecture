import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputListCustomerDTO } from "./list.customer.dto";
import ListCustomerUseCase from "./list.customer.usecase";

const createCustomerRepositoryStub = (): CustomerRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('List Customer Use Case - Unit Test', () => {
    it('should list customers', async () => {
        const addressOne = new Address("Avenida da Saudade", 222, "88.888-888", "Florianópolis");
        const customerOne = CustomerFactory.createWithAddress("Maria", addressOne);

        const addressTwo = new Address("Rua do Ipê", 777, "88.000-000", "Florianópolis");
        const customerTwo = CustomerFactory.createWithAddress("Pedro", addressTwo);

        const customerRepository = createCustomerRepositoryStub();
        customerRepository.findAll = jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo]));

        const input: InputListCustomerDTO = {};

        const usecase = new ListCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output.customers).toBeTruthy();
        expect(output.customers).toHaveLength(2);

        const outputCustomerOne = output.customers[0];
        expect(outputCustomerOne.id).toEqual(customerOne.id);
        expect(outputCustomerOne.name).toEqual(customerOne.name);
        expect(outputCustomerOne.address.street).toEqual(customerOne.Address.street);
        expect(outputCustomerOne.address.number).toEqual(customerOne.Address.number);
        expect(outputCustomerOne.address.zip).toEqual(customerOne.Address.zip);
        expect(outputCustomerOne.address.city).toEqual(customerOne.Address.city);

        const outputCustomerTwo = output.customers[1];
        expect(outputCustomerTwo.id).toEqual(customerTwo.id);
        expect(outputCustomerTwo.name).toEqual(customerTwo.name);
        expect(outputCustomerTwo.address.street).toEqual(customerTwo.Address.street);
        expect(outputCustomerTwo.address.number).toEqual(customerTwo.Address.number);
        expect(outputCustomerTwo.address.zip).toEqual(customerTwo.Address.zip);
        expect(outputCustomerTwo.address.city).toEqual(customerTwo.Address.city);
    });
});