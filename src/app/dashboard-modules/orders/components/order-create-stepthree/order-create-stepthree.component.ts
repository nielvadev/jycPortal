import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { StatesStoreService } from '../../../../shared/services/states-store.service';
import { Table } from 'primeng/table';
import { Detail } from '../../interfaces/IOrderSchema';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-order-create-stepthree',
    standalone: true,
    imports: [PrimeNgModule, FormsModule, CommonModule],
    templateUrl: './order-create-stepthree.component.html',
    styleUrls: ['./order-create-stepthree.component.css'],
    providers: [MessageService]
})
export class OrderCreateStepthreeComponent implements OnInit {
    sstore = inject(StatesStoreService); // Inyección de dependencias StatesStore

    @Output() activateCallback = new EventEmitter<number>();

    searchValue: string | undefined; // Valor de busqueda
    clonedProducts: { [key: string]: any } = {}; // Almacena copias de los productos
    constructor(private messageService: MessageService) {}

    ngOnInit() {}

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    getLabelStock(product: Detail): string {
        if (product.quantity < 1) {
            return 'Agotado';
        } else if (product.quantity < 10) {
            return 'Por agotarse';
        } else {
            return 'Disponible';
        }
    }

    getSeverity(product: Detail): 'success' | 'danger' | 'warn' {
        if (product.quantity < 1) {
            return 'danger';
        } else if (product.quantity < 10) {
            return 'warn';
        } else {
            return 'success';
        }
    }

    onRowEditInit(product: Detail) {
        // Puede almacenar copia si quieres comparar luego
        this.clonedProducts[product.id] = { ...product };
    }

    onRowEditSave(product: Detail) {
        // Guardar cambios
        delete this.clonedProducts[product.id];
        this.sstore.order.set({ ...this.sstore.order(), details: this.sstore.order().details });
    }

    onRowEditCancel(product: Detail, index: number) {
        // Revertir cambios
        this.sstore.order().details[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
    }

    actCallback(step: number) {
        this.sstore.stepTwoOk.set(true);
        this.activateCallback.emit(step);
    }
}
