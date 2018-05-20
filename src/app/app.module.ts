import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';

import { ROUTES } from './routes';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    LoginComponent,
    BaseComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
    ROUTES,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId) ? 'in browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}


// "scripts": {
//     "ng": "ng",
//     "start": "node dist/server/index.js",
//     "predev": "tsc -p server",
//     "dev": "concurrently \"ng serve -pc proxy.conf.json --open\" \"tsc -w -p server\" \"nodemon dist/server/index.js\"",
//     "build": "ng build",
//     "test": "ng test",
//     "lint": "ng lint",
//     "e2e": "ng e2e"
//   },