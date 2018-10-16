import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
    public user: User;
    public currentUser = new Subject<User>();
    public unauthorized = new Subject<{status: number}>();

    constructor(private http: HttpClient) {
    }

    auth() {
        this.http.get('/auth/current_user').subscribe(
            (response: {_id: string, userInfo: {emails: object, firstName: string, lastName: string}, role: string}) => {
                const id = response._id;
                const email = response.userInfo.emails[0].value;
                const role = response.role;
                const fullName = `${response.userInfo.firstName} ${response.userInfo.lastName}`;
                this.user = new User(id, email, role, fullName);
                this.currentUser.next(this.user);
            }, err => {
                this.unauthorized.next({status: err.status});
            });
    }

    getCurrentUser(){
        return this.user;
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