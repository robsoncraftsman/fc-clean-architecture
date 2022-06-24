import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";
import { OutputListCustomerMapper } from "./list.customer.mapper";

export default class ListCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) {

    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.customerRepository.findAll();
        return OutputListCustomerMapper.map(customers);
    }
}