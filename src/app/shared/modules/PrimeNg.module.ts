import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PickListModule } from 'primeng/picklist';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports: [
        ButtonModule,
        ConfirmPopupModule,
        DatePickerModule,
        DialogModule,
        IconFieldModule,
        InputIconModule,
        InputMaskModule,
        InputNumberModule,
        InputTextModule,
        PickListModule,
        SelectModule,
        StepperModule,
        TableModule,
        TagModule,
        TimelineModule,
        ToastModule
    ]
})
export class PrimeNgModule {}
