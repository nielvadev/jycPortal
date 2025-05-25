import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { StatesStoreService } from '../../../../shared/services/states-store.service';
import { ProductsService } from '../../../products/services/products.service';
import { IProduct } from '../../../products/interfaces/IProductSchema';
import { MessageService } from 'primeng/api';
import { Detail } from '../../interfaces/IOrderSchema';

@Component({
    selector: 'app-order-create-steptwo',
    standalone: true,
    imports: [PrimeNgModule, FormsModule, CommonModule],
    templateUrl: './order-create-steptwo.component.html',
    styleUrls: ['./order-create-steptwo.component.css'],
    providers: [MessageService]
})
export class OrderCreateSteptwoComponent implements OnInit {
    sstore = inject(StatesStoreService); // Inyección de dependencias StatesStore
    @Output() activateCallback = new EventEmitter<number>();

    sourceProducts: IProduct[] = [];
    selectedProducts: IProduct[] = [];

    constructor(
        private _products: ProductsService,
        private messageService: MessageService
    ) {
        this.getProducts();
    }

    ngOnInit() {}

    getProducts() {
        this._products.getProducts().subscribe({
            next: (res) => {
                if (res.success) {
                    this.sourceProducts = res.data;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al obtener los Productos'
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    actCallback(step: number) {
        if (this.selectedProducts.length > 0) {
            this.sstore.stepTwoOk.set(true);
            this.activateCallback.emit(step);

            const products: Detail[] = this.selectedProducts.map((p) => ({ id: p.id, productId: p.id, productName: p.name, quantity: p.stock, productPrice: p.price }));
            this.sstore.order.set({ ...this.sstore.order(), details: products });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se ha seleccionado ningun Producto' });
        }
    }
}
