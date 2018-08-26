import {User} from "../models/user.mode";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
    private _user: User;
    currentUser = new Subject<User>();

    constructor(private http: Http) {
    }

    auth() {
        if (!this._user) {
            this.http.get('/api/current_user')
                .subscribe(
                    (response) => {
                        const json = response.json();
                        const email = json.userInfo.emails[0].value;
                        const role = json.role;
                        const fullName = `${json.userInfo.firstName} ${json.userInfo.lastName}`;

                        this._user = new User(email, role, fullName);
                        this.currentUser.next(this._user);
                    });
        }
    }

    isAuthenticated() {
        return !!this._user;
    }
}