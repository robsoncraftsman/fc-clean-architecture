import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDTO } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

describe('List Product Use Case - Integration Test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should list products', async () => {
        const productOne = new Product("1", "Arroz", 10);
        const productTwo = new Product("2", "Feijão", 20);

        const productRepository = new ProductRepository();
        productRepository.create(productOne);
        productRepository.create(productTwo);

        const input: InputListProductDTO = {};

        const usecase = new ListProductUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output.products).toBeTruthy();
        expect(output.products).toHaveLength(2);

        const outputProductOne = output.products[0];
        expect(outputProductOne.id).toEqual(productOne.id);
        expect(outputProductOne.name).toEqual(productOne.name);
        expect(outputProductOne.price).toEqual(productOne.price);

        const outputProductTwo = output.products[1];
        expect(outputProductTwo.id).toEqual(productTwo.id);
        expect(outputProductTwo.name).toEqual(productTwo.name);
        expect(outputProductTwo.price).toEqual(productTwo.price);
    });
});
