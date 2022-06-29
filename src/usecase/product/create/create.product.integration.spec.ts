import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe('Create Product Use Case - Unit Test', () => {
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

    it('should create a product', async () => {
        const input: InputCreateProductDTO = {
            name: "Arroz",
            price: 10
        };

        const expectedOutput: OutputCreateProductDTO = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        };

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);

        const createdProduct = await productRepository.find(output.id);

        expect(createdProduct).toBeTruthy();
        expect(createdProduct.id).toEqual(output.id);
        expect(createdProduct.name).toEqual(output.name);
        expect(createdProduct.price).toEqual(output.price);
    });

    it('should not create a product with an empty name', async () => {
        const input: InputCreateProductDTO = {
            name: "",
            price: 10
        };

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");
    });

    it('should not create a product with a negative price', async () => {
        const input: InputCreateProductDTO = {
            name: "Arroz",
            price: -1
        };

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrow("product: Price must be greater than zero");
    });

    it('should not create a product when name and price are invalid ', async () => {
        const input: InputCreateProductDTO = {
            name: "",
            price: -1
        };

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrow("product: Name is required, product: Price must be greater than zero");
    });
});