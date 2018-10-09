import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class MapService {
    public circleBounds = new Subject<any>();

    getCircleBoundsAsObservable(){
        return this.circleBounds.asObservable();
    }
}