import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export class InputCreateProductMapper {
    static map(input: InputCreateProductDTO): Product {
        return ProductFactory.create(input.name, input.price);
    }
}

export class OutputCreateProductMapper {
    static map(product: Product): OutputCreateProductDTO {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}