import { app } from '../express';
import request from 'supertest';
import ProductModel from '../../product/repository/sequelize/product.model';
import { Sequelize } from 'sequelize-typescript';
import ApiError from '../api.error';

describe('E2E test for product', () => {
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


    it("should create a product", async () => {
        const input = {
            name: "Arroz",
            price: 10
        };

        const response = await request(app).post("/product").send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Arroz");
        expect(response.body.price).toBe(10);
    });

    it('should not create a product with an empty name', async () => {
        const input = { name: "" };

        const response = await request(app).post("/product").send(input);
        const expectedError = new ApiError("Name is required");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expectedError);
    });

    it('should not create a product with a negative price', async () => {
        const input = {
            name: "Arroz",
            price: -1
        };

        const response = await request(app).post("/product").send(input);
        const expectedError = new ApiError("Price must be greater than zero");

        expect(response.status).toBe(500);
        expect(response.body).toEqual(expectedError);
    });


    it('should list all products', async () => {
        const inputCreateProductOne = {
            name: "Arroz",
            price: 10
        };
        const responseCreateProductOne = await request(app).post("/product").send(inputCreateProductOne);
        expect(responseCreateProductOne.status).toBe(200);


        const inputCreateProductTwo = {
            name: "Feijão",
            price: 20
        };
        const responseCreateProductTwo = await request(app).post("/product").send(inputCreateProductTwo);
        expect(responseCreateProductTwo.status).toBe(200);

        const listProductsResponse = await request(app).get("/product").send();
        expect(listProductsResponse.status).toBe(200);
        expect(listProductsResponse.body.products).toBeTruthy();
        expect(listProductsResponse.body.products.length).toBe(2);

        const productOne = listProductsResponse.body.products[0];
        expect(productOne).toEqual({ id: expect.any(String), ...inputCreateProductOne });

        const productTwo = listProductsResponse.body.products[1];
        expect(productTwo).toEqual({ id: expect.any(String), ...inputCreateProductTwo });
    });
});