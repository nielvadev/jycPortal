import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environments';
import { ICreateProductRes, ICreateUpdateProduct, IGetProductRes, IGetProductsRes } from '../interfaces/IProductSchema';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<IGetProductsRes>(ENVIRONMENT.URL_API_PRODUCTS);
    }

    createProduct(product: ICreateUpdateProduct) {
        return this.http.post<ICreateProductRes>(ENVIRONMENT.URL_API_PRODUCTS, product);
    }

    updateProduct(id: string, product: ICreateUpdateProduct) {
        return this.http.put<ICreateProductRes>(ENVIRONMENT.URL_API_PRODUCTS + '/' + id, product);
    }

    getProductById(id: string) {
        return this.http.get<IGetProductRes>(ENVIRONMENT.URL_API_PRODUCTS + '/' + id);
    }
}
