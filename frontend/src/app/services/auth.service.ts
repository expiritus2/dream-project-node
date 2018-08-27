import {User} from "../models/user.mode";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
    public user: User;
    public currentUser = new Subject<User>();
    public unauthorized = new Subject<{status: number}>();

    constructor(private http: Http) {
    }

    auth() {
        return this.http.get('/api/current_user').subscribe(
            (response) => {
                const json = response.json();
                const email = json.userInfo.emails[0].value;
                const role = json.role;
                const fullName = `${json.userInfo.firstName} ${json.userInfo.lastName}`;
                this.user = new User(email, role, fullName);
                this.currentUser.next(this.user);
            }, err => {
                this.unauthorized.next({status: err.status});
            });
    }

    getCurrentUserObservable(){
        return this.currentUser.asObservable();
    }

    getUnauthorisedObservable() {
        return this.unauthorized.asObservable();
    }

    isAuthenticated() {
        return !!this.user;
    }
}