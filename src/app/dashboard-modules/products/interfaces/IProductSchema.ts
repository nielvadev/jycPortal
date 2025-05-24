export interface IGetProductsRes {
    success: boolean;
    data: IProduct[];
    message: string;
}

export interface IGetProductRes {
    success: boolean;
    data: IProduct;
    message: string;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
}

export interface ICreateUpdateProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface ICreateProductRes {
    success: boolean;
    data: ICreateUpdateProduct;
    message: string;
}
