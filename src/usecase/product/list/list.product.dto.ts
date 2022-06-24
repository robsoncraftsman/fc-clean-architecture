export interface ListProductDTO {
    id: string;
    name: string;
    price: number;
}

export interface InputListProductDTO {

}

export interface OutputListProductDTO {
    products: ListProductDTO[];
}