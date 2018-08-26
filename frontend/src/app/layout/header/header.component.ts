import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.mode";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    user: User;
    isAuthenticated: boolean;
    currentUser = new Subscription();

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.auth();
        this.isAuthenticated = this.authService.isAuthenticated();
        this.currentUser = this.authService.currentUser.subscribe(user => {
            this.user = user;
            this.isAuthenticated = this.authService.isAuthenticated();
        });
    }

    ngOnDestroy() {
        this.currentUser.unsubscribe();
    }
}
