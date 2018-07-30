import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Home block routes */
const routes: Routes = [
    {path : '', pathMatch : 'full', redirectTo : '/dashboard' },
    {path : ''}
];

export const Route: ModuleWithProviders = RouterModule.forChild(routes);
