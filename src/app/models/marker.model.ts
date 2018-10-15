import {Circle} from "./circle.model";
import {TargetInfo} from "./target-info.model";

export class Marker {
    public lat: number;
    public lng: number;
    public radius: number;
    public userId: number;
    public circle: Circle;
    public targetInfo: TargetInfo;

    constructor(lat, lng, radius, userId) {
        this.lat = lat;
        this.lng = lng;
        this.radius = radius;
        this.userId = userId;
        this.circle = new Circle(lat, lng);
    }

    setTargetInfo(targetInfo: TargetInfo) {
        this.targetInfo = targetInfo;
    }
}