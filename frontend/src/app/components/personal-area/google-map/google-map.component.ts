import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {Subscription} from "rxjs";
import {Marker} from "../../../models/marker.model";
import {AuthService} from "../../../services/auth.service";
import {TargetService} from "../../../services/target.service";

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
    public initLat: number = 53.851047799999996;
    public initLng: number = 27.6673235;
    public markers = [];
    public isNewMarker: boolean = false;
    public coordsNewMarker: {lat: number, lng: number};
    public zoom: number = 14;
    public isShowForm = false;
    public circleBoundsSubscription: Subscription;
    public targetObjectsSubscription: Subscription;

    constructor(private mapService: MapService,
                private authService: AuthService,
                private targetService: TargetService) {

    }

    ngOnInit() {
        this.getLocation();
        this.getOwnTargetObject();
        // const marker = new Marker(53.851047799999996, 27.6673235);
        this.circleBoundsSubscription = this.mapService.getCircleBoundsAsObservable()
            .subscribe(bounds => {
                // marker.circle.setBounds(bounds);
            });

        // this.markers.push(marker);
    }

    getOwnTargetObject(){
        this.targetObjectsSubscription = this.targetService.getTargetObjects()
            .subscribe(response => {
                console.log(response)
            }, err => {
                console.log(err);
            });
    }

    onCloseForm(event: {close: boolean, targetAdded: boolean}){
        this.isShowForm = !event.close;
        if(this.isNewMarker) {
            if(!event.targetAdded) {
                this.markers.pop();
            }
            this.isNewMarker = false;
        }

    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    }

    setPosition(position) {
        this.initLat = position.coords.latitude;
        this.initLng = position.coords.longitude;
    }

    onMapClicked(event: any) {
        const {lat, lng} = event.coords;
        const marker = new Marker(lat, lng);
        this.markers.push(marker);
        this.isNewMarker = true;
        this.isShowForm = true;
        this.coordsNewMarker = {lat, lng};
    }

    onDeleteMarker(index: number) {
        this.markers.splice(index, 1);
    }

    onClickMarker(){}

    onHoverMarker(){}

    onMouseOut(){}

    onMarkerDragEnd(){}




    onRadiusChange(event: EventEmitter<number>, index: number){
        // console.log(event);
    }

    onCenterChange(event: any, index: number) {
        this.markers[index].lat = event.lat;
        this.markers[index].lng = event.lng;
    }

    onDragEnd(event: EventEmitter<MouseEvent>, index: number) {

    }


    onDragStart(event: EventEmitter<MouseEvent>, index: number) {
        console.log(event);
    }

    ngOnDestroy(): void {
        this.circleBoundsSubscription.unsubscribe();
    }

}
