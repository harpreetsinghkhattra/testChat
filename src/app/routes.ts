import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatModule } from './chatboat/chat.module';

//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TextComponent } from './chatboat/type/text/text.component';
import { VideoComponent } from './chatboat/type/video/video.component';
import { BaseComponent } from './base/base.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chatboat/chat/chat.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', redirectTo: 'chat', pathMatch: 'full' },
            { path: 'dashboard', component: BaseComponent },
            { path: 'chat', loadChildren : 'app/chatboat/chat.module#ChatModule'}
        ]
    },
    { path: '**', component: HomeComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes);