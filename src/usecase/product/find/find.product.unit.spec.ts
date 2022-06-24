import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const createProductRepositoryStub = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('Find Product Use Case - Unit Test', () => {
    it('should find a product', async () => {
        const product = new Product("1", "Arroz", 10);

        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(product));

        const input: InputFindProductDTO = {
            id: "1"
        };

        const usecase = new FindProductUseCase(productRepository);
        const output = await usecase.execute(input);

        const expectedOutput: OutputFindProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        };

        expect(output).toEqual(expectedOutput);
    });

    it('should throw an exception if a product does not exist', async () => {
        const input = {
            id: "1"
        };

        const productRepository = createProductRepositoryStub();
        productRepository.find = jest.fn(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);
        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });
});