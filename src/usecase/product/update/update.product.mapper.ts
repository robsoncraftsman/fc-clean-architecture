import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export class InputUpdateProductMapper {
    static merge(input: InputUpdateProductDTO, product: Product): Product {
        let name;
        if (input.name != null) {
            name = input.name;
        } else {
            name = product.name;
        }

        let price;
        if (input.price != null) {
            price = input.price;
        } else {
            price = product.price;
        }

        return new Product(product.id, name, price);
    }
}

export class OutputUpdateProductMapper {
    static map(product: Product): OutputUpdateProductDTO {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}