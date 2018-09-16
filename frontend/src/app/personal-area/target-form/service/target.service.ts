import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";

@Injectable()
export class TargetService {

    constructor(private http: Http) {}

    sendTarget(targetName: string, targetDescription: string, datetime: number, targetImage: File[]) {
        const postData = new FormData();
        postData.append('targetName', targetName);
        postData.append('targetDescription', targetDescription);
        postData.append('datetime', "" + datetime);
        if (targetImage) {
            for (let i = 0; i < targetImage.length; i++) {
                postData.append("images[]", targetImage[i], targetName);
            }
        }

        const options = new RequestOptions({
            withCredentials: true
        });

        return this.http.post('http://localhost:3000/personal-area/put-target', postData, options);
    }
}