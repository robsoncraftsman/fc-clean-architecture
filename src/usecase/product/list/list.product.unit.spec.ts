import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

const createProductRepositoryStub = (): ProductRepositoryInterface => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe('List Product Use Case - Unit Test', () => {
    it('should list products', async () => {
        const productOne = new Product("1", "Arroz", 10);
        const productTwo = new Product("2", "Feijão", 20);

        const productRepository = createProductRepositoryStub();
        productRepository.findAll = jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo]));

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
