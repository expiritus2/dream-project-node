import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PersonalAreaComponent} from './personal-area/personal-area.component';
import {AdminComponent} from './admin/admin.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AuthService} from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {AuthGuard} from "./services/auth-guard.service";
import { AuthorisedComponent } from './helpers/authorised/authorised.component';
import { LogoutComponent } from './helpers/logout/logout.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PersonalAreaComponent,
        AdminComponent,
        HeaderComponent,
        FooterComponent,
        AuthorisedComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
