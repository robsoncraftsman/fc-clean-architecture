import express, { Request, Response } from 'express';
import { InputCreateProductDTO } from '../../../usecase/product/create/create.product.dto';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ApiError from '../api.error';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try {
        const input: InputCreateProductDTO = {
            name: req.body.name,
            price: req.body.price
        };

        const output = await usecase.execute(input);
        res.send(output);
    } catch (err) {
        res.status(500).send(new ApiError(err));
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (err) {
        res.status(500).send(new ApiError(err));
    }
});