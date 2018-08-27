import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {PersonalAreaComponent} from "./personal-area/personal-area.component";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthorisedComponent} from "./helpers/authorised/authorised.component";
import {LogoutComponent} from "./helpers/logout/logout.component";

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