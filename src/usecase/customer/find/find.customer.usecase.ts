import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) {

    }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        };
    }
}