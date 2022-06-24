import Product from "../../../domain/product/entity/product";
import { OutputListProductDTO } from "./list.product.dto";

export class OutputListProductMapper {
    static map(products: Product[]): OutputListProductDTO {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}