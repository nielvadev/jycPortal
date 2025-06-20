import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { HomeComponent } from './app/shared/components/home/home.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'clientes',
                        children: [
                            {
                                path: '',
                                loadComponent: () =>
                                    import('./app/dashboard-modules/clients/views/clients-table/clients-table.component').then((c) => c.ClientsTableComponent)
                            },
                            {
                                path: 'crear-editar/:id',
                                loadComponent: () =>
                                    import('./app/dashboard-modules/clients/views/clients-create/clients-create.component').then((c) => c.ClientsCreateComponent)
                            }
                        ]
                    },
                    {
                        path: 'productos',
                        children: [
                            {
                                path: '',
                                loadComponent: () =>
                                    import('./app/dashboard-modules/products/views/products-table/products-table.component').then((c) => c.ProductsTableComponent)
                            },
                            {
                                path: 'crear-editar/:id',
                                loadComponent: () =>
                                    import('./app/dashboard-modules/products/views/products-create/product-create.component').then((c) => c.ProductCreateComponent)
                            }
                        ]
                    },
                    {
                        path: 'pedidos',
                        children: [
                            {
                                path: '',
                                loadComponent: () => import('./app/dashboard-modules/orders/views/orders-main/orders-main.component').then((c) => c.OrdersMainComponent)
                            }
                        ]
                    },
                    {
                        path: 'entregas',
                        children: [
                            {
                                path: '',
                                loadComponent: () => import('./app/dashboard-modules/delivery/views/delivery-main/delivery-main.component').then((c) => c.DeliveryMainComponent)
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
