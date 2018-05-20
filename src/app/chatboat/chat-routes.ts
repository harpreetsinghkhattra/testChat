import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextComponent } from './type/text/text.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '', component: ChatComponent, children: [
            { path: '', redirectTo: 'text', pathMatch: 'full' },
            { path: 'text', component: TextComponent }
        ]
    }
];

export const ChildRoutes: ModuleWithProviders = RouterModule.forChild(routes);

// @NgModule({
//   imports: [
//     RouterModule.forChild(routes)
//   ],
//   exports: [
//     RouterModule
//   ],
//   providers: [
//   ]
// })
// export class ChildRoutes { }