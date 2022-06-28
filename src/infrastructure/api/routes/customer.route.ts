import express, { request, Request, Response } from 'express';
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.customer.dto';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const input: InputCreateCustomerDTO = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const output = await usecase.execute(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});