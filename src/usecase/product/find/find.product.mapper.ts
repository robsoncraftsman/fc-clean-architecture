import Product from "../../../domain/product/entity/product";
import { OutputFindProductDTO } from "./find.product.dto";

export class OutputFindProductMapper {
    static map(product: Product): OutputFindProductDTO {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}