import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'Clientes',
                items: [
                    {
                        label: 'Crear/editar Cliente',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/dashboard/clientes/crear']
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-address-book',
                        routerLink: ['/dashboard/clientes']
                    }
                ]
            },
            {
                label: 'Pedidos',
                items: [{ label: 'Gestionar Pedidos', icon: 'pi pi-fw pi-box', routerLink: ['/pedidos'] }]
            },
            {
                label: 'Entregas',
                items: [{ label: 'Gestionar Entregas', icon: 'pi pi-fw pi-truck', routerLink: ['/entregas'] }]
            }
        ];
    }
}
