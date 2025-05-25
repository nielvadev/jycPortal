import { Injectable, signal, WritableSignal } from '@angular/core';
import { IOrder } from '../../dashboard-modules/orders/interfaces/IOrderSchema';

@Injectable({
    providedIn: 'root'
})
export class StatesStoreService {
    //Controlador de Stepper Creación de Pedido
    stepOneOk: WritableSignal<boolean> = signal(false);
    stepTwoOk: WritableSignal<boolean> = signal(false);
    stepThreeOk: WritableSignal<boolean> = signal(false);

    //Objetos de Pedido
    order: WritableSignal<IOrder> = signal({} as IOrder);

    constructor() {}
}
