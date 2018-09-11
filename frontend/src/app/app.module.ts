import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PersonalAreaComponent} from './personal-area/personal-area.component';
import {AdminComponent} from './admin/admin.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AuthService} from "./service/auth.service";
import {HttpModule} from "@angular/http";
import {AuthGuard} from "./service/auth-guard.service";
import {AuthorisedComponent} from './helpers/authorised/authorised.component';
import {LogoutComponent} from './helpers/logout/logout.component';
import {AgmCoreModule} from '@agm/core';
import {GoogleMapComponent} from './personal-area/google-map/google-map.component';
import {AgmCircle} from "./personal-area/google-map/directives/agm-circle.directive";
import {MapService} from "./personal-area/google-map/service/map.service";
import {TargetService} from "./personal-area/target-form/service/target.service";
import {TargetFormComponent} from './personal-area/target-form/target-form.component';
import {ReactiveFormsModule} from "@angular/forms";

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
        AgmCircle,
        TargetFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AppRoutingModule,
        HttpModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDZQ0NlqUu8LdwdDWwOxOYuHaBtDEkGJfo'
        })
    ],
    providers: [AuthService, AuthGuard, MapService, TargetService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
