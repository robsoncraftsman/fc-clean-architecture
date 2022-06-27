import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export class InputUpdateProductMapper {
    static bind(input: InputUpdateProductDTO, product: Product): void {
        product.changeName(input.name);
        product.changePrice(input.price);
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