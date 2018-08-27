import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Injectable, OnDestroy} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
    currentUser: Subscription;
    unauthorised: Subscription;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise<boolean>((resolve, reject) => {
            this.authService.auth();
            this.currentUser = this.authService.getCurrentUserObservable().subscribe(response => resolve(true));
            this.unauthorised = this.authService.getUnauthorisedObservable()
                .subscribe(
                    response => {
                        this.router.navigate(['/']);
                        resolve(false)
                    }
                )
        });
    }

    ngOnDestroy(): void {
        this.currentUser.unsubscribe();
        this.unauthorised.unsubscribe();
    }
}