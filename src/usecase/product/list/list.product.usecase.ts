import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";
import { OutputListProductMapper } from "./list.product.mapper";

export default class ListProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {

    }

    async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.productRepository.findAll();
        return OutputListProductMapper.map(products);
    }
}