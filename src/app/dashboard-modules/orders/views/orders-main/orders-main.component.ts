import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IOrder } from '../../interfaces/IOrderSchema';
import { OrderCreateModalComponent } from '../../components/order-create-modal/order-create-modal.component';

@Component({
    selector: 'app-orders-main',
    standalone: true,
    imports: [PrimeNgModule, CommonModule, OrderCreateModalComponent],
    templateUrl: './orders-main.component.html',
    styleUrls: ['./orders-main.component.css']
})
export class OrdersMainComponent implements OnInit {
    ordersNum: number = 0; // Número de pedidos para mostrar

    createModal: boolean = false;
    orders: IOrder[] = []; // Lista de pedidos

    constructor(public router: Router) {}

    ngOnInit() {}
}
