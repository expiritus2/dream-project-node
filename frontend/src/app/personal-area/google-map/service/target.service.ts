import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class TargetService {

    constructor(private http: Http) {}

    sendTarget(targetName: string, targetDescription: string, datetime: string, targetImage: File[]) {
        const postData = new FormData();
        postData.append('targetName', targetName);
        postData.append('targetDescription', targetDescription);
        postData.append('datetime', datetime);
        postData.append("images" ,targetImage[0], targetName);
        // for(let i = 0; i < targetImage.length; i++) {
        //     postData.append("images[]" ,targetImage[i], targetName);
        // }


        this.http.post('http://localhost:3000/personal-area/put-target', postData)
            .subscribe(response => {
                console.log(response);
            })
    }
}