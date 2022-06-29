import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import { InputUpdateProductMapper, OutputUpdateProductMapper } from "./update.product.mapper";

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {

    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const productFromDb = await this.productRepository.find(input.id);
        const productToUpdate = InputUpdateProductMapper.merge(input, productFromDb);
        await this.productRepository.update(productToUpdate);
        return OutputUpdateProductMapper.map(productToUpdate);
    }
}