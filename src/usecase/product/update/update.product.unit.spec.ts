import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const createProductRepositoryStub = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Update Product Use Case - Unit Test', () => {
    it('should update a product', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn().mockReturnValue(productFromDb);

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
    });

    it('should not update a product that not exists', async () => {
        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn(() => {
            throw new Error("Product not found");
        });

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "Arroz",
            price: 10
        };

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });

    it('should not update a product with an empty name', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn().mockReturnValue(productFromDb);

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
        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn().mockReturnValue(productFromDb);

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "Arroz",
            price: -1
        };

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("product: Price must be greater than zero");
    });

    it('should not update a product with an empty name and a negative price', async () => {
        const productFromDb = new Product("1", "Arroz", 10);
        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn().mockReturnValue(productFromDb);

        const input: InputUpdateProductDTO = {
            id: "1",
            name: "",
            price: -1
        };

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrowError("product: Name is required, product: Price must be greater than zero");
    });
});