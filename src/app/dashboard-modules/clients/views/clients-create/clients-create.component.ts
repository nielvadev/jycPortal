import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { ICreateClient, ICreateClientRes, IGetClientRes, IUpdateClient } from '../../interfaces/IClientSchema';

export function emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email: string = control.value || '';
        const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validEmailPattern.test(email) ? null : { invalidEmailFormat: true };
    };
}

@Component({
    selector: 'app-clients-create',
    standalone: true,
    imports: [PrimeNgModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './clients-create.component.html',
    styleUrls: ['./clients-create.component.css'],
    providers: [MessageService]
})
export class ClientsCreateComponent implements OnInit {
    newClientForm: FormGroup; // Formulario de creación de Cliente

    clientId: string = ''; // Identificador del Cliente
    clientDoc: string = ''; // Documento del Cliente para mostrar en título
    isEdit: boolean = false; // Indica si se trata de una edición

    docTypeOptions = [{ label: 'C.C', value: 'CC' }]; // Tipos de Documento

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private _clients: ClientsService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.newClientForm = this.fb.group({
            documentType: ['', Validators.required],
            clientDoc: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, emailFormatValidator()]],
            phone: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id == '0') {
                this.isEdit = false;
                this.newClientForm.reset();
                this.newClientForm.controls['documentType'].enable();
                this.newClientForm.controls['clientDoc'].enable();
                return;
            }
            if (id) {
                this.clientId = id;
                this.loadClientData(id);
            }
        });
    }

    loadClientData(id: string) {
        this._clients.getClientById(id).subscribe({
            next: (res: IGetClientRes) => {
                if (!res.success) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el cliente' });
                    this.isEdit = false;
                    return;
                }

                this.clientDoc = res.data.clientDoc;
                this.isEdit = true;
                this.newClientForm.patchValue({
                    documentType: 'CC',
                    clientDoc: res.data.clientDoc,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phone: res.data.phone,
                    address: res.data.address
                });

                this.newClientForm.controls['documentType'].disable();
                this.newClientForm.controls['clientDoc'].disable();
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el cliente' });
                console.error(err);
            }
        });
    }

    createClient() {
        const payload: ICreateClient = {
            clientDoc: this.newClientForm.value.clientDoc,
            firstName: this.newClientForm.value.firstName,
            lastName: this.newClientForm.value.lastName,
            email: this.newClientForm.value.email,
            phone: this.newClientForm.value.phone,
            address: this.newClientForm.value.address
        };
        this._clients.createClient(payload).subscribe({
            next: (response: ICreateClientRes) => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado correctamente' });
                    this.newClientForm.reset();
                    return;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al crear el cliente'
                    });
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    updateClient() {
        const payload: IUpdateClient = {
            firstName: this.newClientForm.value.firstName,
            lastName: this.newClientForm.value.lastName,
            email: this.newClientForm.value.email,
            phone: this.newClientForm.value.phone,
            address: this.newClientForm.value.address
        };
        this._clients.updateClient(this.clientId, payload).subscribe({
            next: (response: ICreateClientRes) => {
                if (response.success) {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado correctamente' });
                    this.newClientForm.reset();
                    return;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al actualizar el cliente'
                    });
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
