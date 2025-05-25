import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { ClientsService } from '../../../clients/services/clients.service';
import { Client } from '../../interfaces/IOrderSchema';
import { StatesStoreService } from '../../../../shared/services/states-store.service';

@Component({
    selector: 'app-order-create-stepone',
    standalone: true,
    imports: [PrimeNgModule, FormsModule, CommonModule],
    templateUrl: './order-create-stepone.component.html',
    styleUrls: ['./order-create-stepone.component.css']
})
export class OrderCreateSteponeComponent implements OnInit {
    sstore = inject(StatesStoreService); // Inyección de dependencias StatesStore

    estimatedDeliveryDate = new Date(); // Fecha estimada de entrega
    orderDate = new Date(); // Fecha de pedido
    minSelectableDate: Date = new Date(); // Fecha mínima seleccionable
    selectedClient: Client = {} as Client;

    clients: Client[] = [];

    constructor(private _clients: ClientsService) {}

    ngOnInit() {
        this.getClients();
        this.estimatedDeliveryDate = this.getEstimatedDeliveryDate(this.orderDate);
        this.sstore.order.set({ ...this.sstore.order(), orderDate: this.orderDate, estimatedDeliveryDate: this.estimatedDeliveryDate });
    }

    getClients() {
        this._clients.getClients().subscribe({
            next: (res) => {
                if (res.success) {
                    this.clients = res.data;
                } else {
                    console.log('Error al obtener los clientes');
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    onDateChange(event: any) {
        this.estimatedDeliveryDate = this.getEstimatedDeliveryDate(this.sstore.order().orderDate);
        this.sstore.order.set({ ...this.sstore.order(), estimatedDeliveryDate: this.estimatedDeliveryDate });
        console.log(this.sstore.order());
    }

    getEstimatedDeliveryDate(inputDate: Date): Date {
        const MIDDAY_HOUR = 12;

        // Cada entrada: [díaInicio, antesDelMediodia?, díaEntrega]
        const windows: { from: number; afterMidday: boolean; deliverOn: number }[] = [
            { from: 4, afterMidday: true, deliverOn: 1 }, // Jueves PM → Lunes
            { from: 5, afterMidday: true, deliverOn: 2 }, // Viernes PM → Martes
            { from: 6, afterMidday: true, deliverOn: 3 }, // Sábado PM → Miércoles
            { from: 0, afterMidday: true, deliverOn: 4 }, // Domingo PM → Jueves
            { from: 1, afterMidday: true, deliverOn: 5 }, // Lunes PM → Viernes
            { from: 2, afterMidday: true, deliverOn: 6 }, // Martes PM → Sábado
            { from: 3, afterMidday: true, deliverOn: 1 } // Miércoles PM → Lunes
        ];

        const day = inputDate.getDay();
        const hour = inputDate.getHours();
        const afterMidday = hour >= MIDDAY_HOUR;

        // Encontrar ventana actual
        for (const w of windows) {
            const sameDay = w.from === day;
            const nextDay = (w.from + 1) % 7 === day;

            if ((sameDay && afterMidday && w.afterMidday) || (nextDay && !afterMidday && w.afterMidday)) {
                const deliveryDate = new Date(inputDate);
                let diff = w.deliverOn - day;
                if (diff <= 0) diff += 7;
                deliveryDate.setDate(inputDate.getDate() + diff);
                deliveryDate.setHours(10, 0, 0, 0);
                return deliveryDate;
            }
        }

        // Si no encontró ninguna ventana (Domingo completo), saltar al lunes
        const nextMonday = new Date(inputDate);
        const daysToMonday = (1 + 7 - day) % 7 || 7;
        nextMonday.setDate(inputDate.getDate() + daysToMonday);
        nextMonday.setHours(10, 0, 0, 0);
        return nextMonday;
    }

    next(event: any) {
        if (event.value === null) {
            this.sstore.stepOneOk.set(false);
            return;
        }
        this.sstore.stepOneOk.set(true);
    }
}
