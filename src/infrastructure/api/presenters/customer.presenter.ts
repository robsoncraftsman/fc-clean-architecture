import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {

    static toXML(data: OutputListCustomerDTO): string {
        const xmlOptions = {
            header: true,
            indent: " ",
            newline: "\n",
            allowEmpty: true
        };

        const customers = data.customers.map((customer) => ({
            customer: {
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    number: customer.address.number,
                    zip: customer.address.zip
                }
            }
        }));

        return toXML({
            customers
        }, xmlOptions);
    }

}