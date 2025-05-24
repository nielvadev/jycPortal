import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsService } from '../../services/clients.service';
import { Observer } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PrimeNgModule } from '../../../../shared/modules/PrimeNg.module';
import { HelpersService } from '../../../../shared/services/helpers.service';
import { IClient } from '../../interfaces/IClientSchema';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-clients-table',
    standalone: true,
    imports: [PrimeNgModule, CommonModule],
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class ClientsTableComponent implements OnInit {
    //#region Variables
    clients: IClient[] = []; // Array con clientes

    totalRows = 5; // Total de registros
    searchValue: string | undefined; // Valor de busqueda

    paginatorValues = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' }
    ];
    //#endregion Variables

    constructor(
        private _clients: ClientsService,
        private confirmationService: ConfirmationService,
        public router: Router,
        private messageService: MessageService,
        public _helpers: HelpersService
    ) {
        this.getClients();
    }

    ngOnInit() {}

    //#region Acciones Tabla
    getClients() {
        this._clients.getClients().subscribe({
            next: (res) => {
                if (res.success) {
                    this.clients = res.data;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al obtener los clientes'
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    onRowEditInit(client: IClient) {
        this.router.navigate(['/dashboard/clientes/crear-editar', client.id]);
    }

    confirmDelete(event: Event, user: IClient) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Seguro de eliminar este cliente?',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Si',
            acceptButtonStyleClass: 'p-button-danger p-button-sm',
            accept: () => {
                this.deleteClient(user);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelado',
                    detail: 'Operación cancelada',
                    life: 3000
                });
            }
        });
    }

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    deleteClient(client: IClient) {}
    //#endregion
}
