import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthGuard} from "../../services/auth-guard.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    isShow = false;
    currentUser: Subscription;
    unauthorised: Subscription;

    constructor(private authService: AuthService,
                private authGuard: AuthGuard) {
    }

    ngOnInit() {
        this.defineAuthGreet();
    }

    defineAuthGreet() {
        this.isAuthenticated = this.authService.isAuthenticated();
        const authorised = JSON.parse(localStorage.getItem("authorised"));
        if (!this.authService.user && authorised) {
            this.authService.auth();
            this.currentUser = this.authService.getCurrentUserObservable()
                .subscribe(
                    user => {
                        this.isShow = true;
                        this.isAuthenticated = this.authService.isAuthenticated();
                        localStorage.setItem("auth", JSON.stringify(true));
                    }, err => {
                        this.isAuthenticated = this.authService.isAuthenticated();
                        this.isShow = true;
                    }
                );
            this.unauthorised = this.authService.getUnauthorisedObservable()
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
        if(this.currentUser){
            this.currentUser.unsubscribe();
        }

        if(this.unauthorised) {
            this.unauthorised.unsubscribe();
        }

    }
}