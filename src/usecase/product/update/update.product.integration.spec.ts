import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe('Update Product Use Case - Unit Test', () => {
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

    it('should update a product', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(productFromDb);

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "Arroz Updated",
            price: 20
        };

        const expectedOutput: OutputUpdateProductDTO = {
            id: input.id,
            name: input.name,
            price: input.price
        };

        const usecase = new UpdateProductUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);

        const updatedProduct = await productRepository.find(output.id);

        expect(updatedProduct).toBeTruthy();
        expect(updatedProduct.id).toEqual(output.id);
        expect(updatedProduct.name).toEqual(output.name);
        expect(updatedProduct.price).toEqual(output.price);
    });

    it('should not update a product that not exists', async () => {
        const input: InputUpdateProductDTO = {
            id: "1",
            name: "Arroz",
            price: 10
        };

        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });

    it('should not update a product with an empty name', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(productFromDb);

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "",
            price: 10
        };

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("product: Name is required");
    });

    it('should not update a product with a negative price', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(productFromDb);

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "Arroz",
            price: -1
        };

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("product: Price must be greater than zero");
    });
});