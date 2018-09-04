import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "./service/map.service";
import {Subscription} from "rxjs";
import {Marker} from "./models/marker.model";

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
    public zoom: number = 14;
    public isShowForm = false;
    public circleBoundsSubscription: Subscription;

    constructor(private mapService: MapService) {

    }

    ngOnInit() {
        this.getLocation();
        // const marker = new Marker(53.851047799999996, 27.6673235);
        this.circleBoundsSubscription = this.mapService.getCircleBoundsAsObservable()
            .subscribe(bounds => {
                // marker.circle.setBounds(bounds);
            });

        // this.markers.push(marker);
    }

    onCloseForm(isShowForm: boolean){
        this.isShowForm = !isShowForm;
        if(this.isNewMarker) {
            this.markers.pop();
            this.isNewMarker = false;
        }

    }

    ngOnDestroy(): void {
        this.circleBoundsSubscription.unsubscribe();
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
        this.markers.push(new Marker(lat, lng));
        this.isNewMarker = true;
        this.isShowForm = true;
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

}
