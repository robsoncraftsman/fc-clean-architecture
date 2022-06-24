import Customer from "../../../domain/customer/entity/customer";

export interface ListCustomerDTO {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    };
}

export interface InputListCustomerDTO {

}

export interface OutputListCustomerDTO {
    customers: ListCustomerDTO[];
}