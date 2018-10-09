import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {PersonalAreaComponent} from './components/personal-area/personal-area.component';
import {AdminComponent} from './components/admin/admin.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthorisedComponent} from './components/helpers/authorised/authorised.component';
import {LogoutComponent} from './components/helpers/logout/logout.component';
import {AgmCoreModule} from '@agm/core';
import {GoogleMapComponent} from './components/personal-area/google-map/google-map.component';
import {AgmCircle} from "./components/personal-area/google-map/agm-circle.directive";
import {MapService} from "./services/map.service";
import {TargetService} from "./services/target.service";
import {TargetFormComponent} from './components/personal-area/target-form/target-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

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
        HttpClientModule,
        FormsModule,
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
