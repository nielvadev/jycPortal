import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { HomeComponent } from './app/shared/components/home/home.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
];
