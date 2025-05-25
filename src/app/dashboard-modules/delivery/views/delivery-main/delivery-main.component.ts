import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delivery-main',
    standalone: true,
    imports: [PrimeNgModule, CommonModule],
    templateUrl: './delivery-main.component.html',
    styleUrls: ['./delivery-main.component.css']
})
export class DeliveryMainComponent implements OnInit {
    events: any[];

    constructor() {
        this.events = [
            { status: 'Ordenado', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
            { status: 'Procesado', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Enviado', date: '18/10/2020 10:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Entregado', date: '18/10/2020 16:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }

    ngOnInit(): void {}
}
