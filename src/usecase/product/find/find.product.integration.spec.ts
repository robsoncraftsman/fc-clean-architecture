import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe('Find Product Use Case - Integration Test', () => {
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

    it('should find a product', async () => {
        const product = new Product("1", "Arroz", 10);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

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

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        await expect(usecase.execute(input)).rejects.toThrowError("Product not found");
    });
});