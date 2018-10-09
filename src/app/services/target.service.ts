import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TargetService {

    constructor(private http: HttpClient) {}

    sendTarget(targetName: string, targetDescription: string, datetime: number, targetImages: File[], coords: {lat: number, lng: number}) {
        const postData = new FormData();
        postData.append('targetName', targetName);
        postData.append('targetDescription', targetDescription);
        postData.append('datetime', "" + datetime);
        postData.append('lat', coords.lat.toString());
        postData.append('lng', coords.lng.toString());
        if (targetImages) {
            for (let i = 0; i < targetImages.length; i++) {
                const imageOriginalName = targetImages[i].name;
                postData.append("images[]", targetImages[i], imageOriginalName);
            }
        }

        return this.http.post('http://localhost:3000/personal-area/put-target', postData, {withCredentials: true});
    }

    getTargetObjects(){
        return this.http.get('http://localhost:3000/personal-area/get-target-objects', {withCredentials: true});
    }
}