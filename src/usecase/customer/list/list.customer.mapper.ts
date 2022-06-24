import Customer from "../../../domain/customer/entity/customer";
import { OutputListCustomerDTO } from "./list.customer.dto";

export class OutputListCustomerMapper {
    static map(customers: Customer[]): OutputListCustomerDTO {
        return {
            customers: customers.map((customer) =>
            ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city
                }
            }))
        };
    }
}
