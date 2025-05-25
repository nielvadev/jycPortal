import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observer } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { HelpersService } from '../../../../shared/services/helpers.service';
import { Table } from 'primeng/table';
import { ICreateProductRes, ICreateUpdateProduct, IProduct } from '../../interfaces/IProductSchema';
import { IClient } from '../../../clients/interfaces/IClientSchema';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-products-table',
    standalone: true,
    imports: [PrimeNgModule, CommonModule, FormsModule],
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class ProductsTableComponent implements OnInit {
    //#region Variables
    products: IProduct[] = []; // Array con clientes

    searchValue: string | undefined; // Valor de busqueda
    clonedProducts: { [key: string]: any } = {}; // Almacena copias de los productos

    paginatorValues = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' }
    ];
    //#endregion Variables

    constructor(
        private _products: ProductsService,
        private confirmationService: ConfirmationService,
        public router: Router,
        private messageService: MessageService,
        public _helpers: HelpersService
    ) {
        this.getProducts();
    }

    ngOnInit() {}

    //#region Acciones Tabla
    getProducts() {
        this._products.getProducts().subscribe({
            next: (res) => {
                if (res.success) {
                    this.products = res.data;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al obtener los productos'
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    editProduct(product: IClient) {
        this.router.navigate(['/dashboard/productos/crear-editar', product.id]);
    }

    onRowEditInit(product: IProduct) {
        // Puede almacenar copia si quieres comparar luego
        this.clonedProducts[product.id] = { ...product };
    }

    onRowEditSave(product: IProduct) {
        // Guardar cambios
        delete this.clonedProducts[product.id];
        this.updateProduct(product);
    }

    onRowEditCancel(product: IProduct, index: number) {
        // Revertir cambios
        this.products[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
    }

    getLabelStock(product: IProduct): string {
        if (product.stock < 1) {
            return 'Agotado';
        } else if (product.stock < 10) {
            return 'Por agotarse';
        } else {
            return 'Disponible';
        }
    }

    getSeverity(product: IProduct): 'success' | 'danger' | 'warn' {
        if (product.stock < 1) {
            return 'danger';
        } else if (product.stock < 10) {
            return 'warn';
        } else {
            return 'success';
        }
    }

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    updateProduct(product: IProduct) {
        const payload: ICreateUpdateProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        };
        this._products.updateProduct(product.id, payload).subscribe({
            next: (response: ICreateProductRes) => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado correctamente' });
                    return;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al actualizar el Producto'
                    });
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
    //#endregion
}
