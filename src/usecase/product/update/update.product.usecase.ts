import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import { InputUpdateProductMapper, OutputUpdateProductMapper } from "./update.product.mapper";

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {

    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = await this.productRepository.find(input.id);
        InputUpdateProductMapper.bind(input, product);
        await this.productRepository.update(product);
        return OutputUpdateProductMapper.map(product);
    }
}