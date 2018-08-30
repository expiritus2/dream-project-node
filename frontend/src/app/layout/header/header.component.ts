import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {AuthGuard} from "../../service/auth-guard.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user.mode";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    isShow = false;
    currentUser: User;
    currentUserSubscription: Subscription;
    unauthorisedSubscription: Subscription;

    constructor(private authService: AuthService,
                private authGuard: AuthGuard) {
    }

    ngOnInit() {
        this.defineAuthGreet();
    }

    defineAuthGreet() {
        this.isAuthenticated = this.authService.isAuthenticated();
        this.currentUser = this.authService.getCurrentUser();
        const authorised = JSON.parse(localStorage.getItem("authorised"));
        if (!this.authService.user && authorised) {
            this.authService.auth();
            this.currentUserSubscription = this.authService.getCurrentUserObservable()
                .subscribe(
                    user => {
                        this.isShow = true;
                        this.isAuthenticated = this.authService.isAuthenticated();
                        this.currentUser = user;
                        localStorage.setItem("auth", JSON.stringify(true));
                    }, err => {
                        this.isAuthenticated = this.authService.isAuthenticated();
                        this.isShow = true;
                    }
                );
            this.unauthorisedSubscription = this.authService.getUnauthorisedObservable()
                .subscribe(
                    response => {
                        if(response.status === 401) {
                            this.isShow = true;
                        }
                    }
                )
        } else {
            this.isShow = true;
        }
    }

    ngOnDestroy(){
        if(this.currentUserSubscription){
            this.currentUserSubscription.unsubscribe();
        }

        if(this.unauthorisedSubscription) {
            this.unauthorisedSubscription.unsubscribe();
        }

    }
}
