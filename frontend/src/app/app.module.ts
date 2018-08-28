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
import {AuthorisedComponent} from './helpers/authorised/authorised.component';
import {LogoutComponent} from './helpers/logout/logout.component';
import {AgmCoreModule, CircleManager, GoogleMapsAPIWrapper} from '@agm/core';
import {GoogleMapComponent} from './personal-area/google-map/google-map.component';
import {AgmCircle} from "./personal-area/google-map/directives/agm-circle.directive";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PersonalAreaComponent,
        AdminComponent,
        HeaderComponent,
        FooterComponent,
        AuthorisedComponent,
        LogoutComponent,
        GoogleMapComponent,
        AgmCircle
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDZQ0NlqUu8LdwdDWwOxOYuHaBtDEkGJfo'
        })
    ],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
