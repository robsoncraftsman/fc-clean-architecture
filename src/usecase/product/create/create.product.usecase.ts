import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import { InputCreateProductMapper, OutputCreateProductMapper } from "./create.product.mapper";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {

    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const product = InputCreateProductMapper.map(input);
        this.productRepository.create(product);
        return OutputCreateProductMapper.map(product);
    }
}