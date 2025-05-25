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
        const currentDay = inputDate.getDay();
        const currentHour = inputDate.getHours();
        const currentMinute = inputDate.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const NOON_IN_MINUTES = 12 * 60;

        let estimatedDeliveryDate = new Date(inputDate);
        estimatedDeliveryDate.setHours(10, 0, 0, 0);

        const calculateDeliveryDate = (startDay: number, deliveryDay: number): Date => {
            let daysToAdd = deliveryDay - startDay;
            if (daysToAdd < 0) {
                daysToAdd += 7;
            }
            const delivery = new Date(inputDate);
            delivery.setDate(inputDate.getDate() + daysToAdd);
            delivery.setHours(10, 0, 0, 0);
            return delivery;
        };

        // Para que los pedidos sean entregados el LUNES
        // Opción 1: desde el viernes anterior al medio día hasta el sábado al medio día.
        if (currentDay === 5 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Viernes después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 1); // 1 = Lunes
            // Asegurarse de que sea el Lunes siguiente, no el de la misma semana si ya pasó
            if (estimatedDeliveryDate.getDay() !== 1 || estimatedDeliveryDate < inputDate) {
                estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + ((1 - estimatedDeliveryDate.getDay() + 7) % 7));
            }
        } else if (currentDay === 6 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Sábado antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 1); // 1 = Lunes
            // Asegurarse de que sea el Lunes siguiente, no el de la misma semana si ya pasó
            if (estimatedDeliveryDate.getDay() !== 1 || estimatedDeliveryDate < inputDate) {
                estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + ((1 - estimatedDeliveryDate.getDay() + 7) % 7));
            }
        }
        // Opción 2: desde el jueves después de medio día hasta el viernes al medio día.
        else if (currentDay === 4 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Jueves después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 1); // 1 = Lunes
        } else if (currentDay === 5 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Viernes antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 1); // 1 = Lunes
        }

        // Para que los pedidos sean entregados el MARTES
        // desde el sábado anterior después de medio día hasta el domingo al medio día.
        else if (currentDay === 6 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Sábado después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 2); // 2 = Martes
        } else if (currentDay === 0 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Domingo antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 2); // 2 = Martes
        }

        // Para que los pedidos sean entregados el MIÉRCOLES
        // desde el domingo anterior después de medio día hasta el lunes al medio día.
        else if (currentDay === 0 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Domingo después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 3); // 3 = Miércoles
        } else if (currentDay === 1 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Lunes antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 3); // 3 = Miércoles
        }

        // Para que los pedidos sean entregados el JUEVES
        // desde el lunes después de medio día hasta el martes al medio día.
        else if (currentDay === 1 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Lunes después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 4); // 4 = Jueves
        } else if (currentDay === 2 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Martes antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 4); // 4 = Jueves
        }

        // Para que los pedidos sean entregados el VIERNES
        // desde el martes después de medio día hasta el miércoles al medio día.
        else if (currentDay === 2 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Martes después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 5); // 5 = Viernes
        } else if (currentDay === 3 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Miércoles antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 5); // 5 = Viernes
        }

        // Para que los pedidos sean entregados el SÁBADO
        // desde el miércoles después de medio día (hasta el jueves al medio día)
        else if (currentDay === 3 && currentTimeInMinutes >= NOON_IN_MINUTES) {
            // Miércoles después de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 6); // 6 = Sábado
        } else if (currentDay === 4 && currentTimeInMinutes < NOON_IN_MINUTES) {
            // Jueves antes de 12:00 PM
            estimatedDeliveryDate = calculateDeliveryDate(currentDay, 6); // 6 = Sábado
        }
        // Si no cae en ninguna de las ventanas de tiempo específicas (es decir, está "fuera de horario" para cualquier pedido),
        // o cae en un momento que no está cubierto por las reglas explícitas (por ejemplo, sábado o domingo por la tarde fuera de las ventanas).
        else {
            console.log(`❌ Fecha de entrada (${inputDate.toLocaleString()}) fuera de las ventanas de pedido definidas.`);
            // Podrías decidir si quieres lanzar un error, devolver null, o una fecha por defecto.
            // Por ahora, para seguir el patrón anterior, devolvemos la misma fecha de entrada.
            return new Date(inputDate);
        }

        console.log(`✅ Pedido dentro de ventana. Entrega estimada: ${estimatedDeliveryDate.toLocaleString()}`);
        return estimatedDeliveryDate;
    }

    next(event: any) {
        if (event.value === null) {
            this.sstore.stepOneOk.set(false);
            return;
        }
        this.sstore.stepOneOk.set(true);
    }
}
