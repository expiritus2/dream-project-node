import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./components/home/home.component";
import {AdminComponent} from "./components/admin/admin.component";
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthorisedComponent} from "./components/helpers/authorised/authorised.component";
import {LogoutComponent} from "./components/helpers/logout/logout.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'authorised', component: AuthorisedComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'personal-area', component: PersonalAreaComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}