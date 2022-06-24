import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const createProductRepositoryStub = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Create Product Use Case - Unit Test', () => {
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

        const productRepository = createProductRepositoryStub();
        const usecase = new CreateProductUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('should not create a product with an empty name', async () => {
        const input: InputCreateProductDTO = {
            name: "",
            price: 10
        };

        const productRepository = createProductRepositoryStub();
        const usecase = new CreateProductUseCase(productRepository);

        expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it('should not create a product with a negative price', async () => {
        const input: InputCreateProductDTO = {
            name: "Arroz",
            price: -1
        };

        const productRepository = createProductRepositoryStub();
        const usecase = new CreateProductUseCase(productRepository);

        expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});