import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderCreateSteponeComponent } from '../order-create-stepone/order-create-stepone.component';
import { StatesStoreService } from '../../../../shared/services/states-store.service';
import { OrderCreateSteptwoComponent } from "../order-create-steptwo/order-create-steptwo.component";
import { OrderCreateStepthreeComponent } from "../order-create-stepthree/order-create-stepthree.component";

@Component({
    selector: 'app-order-create-modal',
    standalone: true,
    imports: [PrimeNgModule, FormsModule, CommonModule, OrderCreateSteponeComponent, OrderCreateSteptwoComponent, OrderCreateStepthreeComponent],
    templateUrl: './order-create-modal.component.html',
    styleUrls: ['./order-create-modal.component.css']
})
export class OrderCreateModalComponent implements OnInit {
    sstore = inject(StatesStoreService); // Inyección de dependencias StatesStore

    constructor() {}

    ngOnInit() {}
}
