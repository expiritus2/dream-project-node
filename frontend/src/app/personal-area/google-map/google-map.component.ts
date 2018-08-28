import {Component, EventEmitter, NgZone, OnInit, ViewChild} from '@angular/core';
import {LatLngLiteral, CircleManager, LatLngBounds} from '@agm/core';
import {AgmCircle} from "./directives/agm-circle.directive";

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
    lat: number = 53.851047799999996;
    lng: number = 27.6673235;
    zoom: number = 16;

    constructor() {

    }

    ngOnInit() {
        this.getLocation();
        // console.log(this.getBounds())
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    }

    setPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }

    onMapClicked(event: MouseEvent) {

    }

    onClickMarker(){}

    onHoverMarker(){}

    onMouseOut(){}

    onMarkerDragEnd(){}

    onRadiusChange(event: EventEmitter<number>){
        // console.log(event);
    }

    onCenterChange(event: EventEmitter<LatLngLiteral>) {

    }

    onDragEnd(event: EventEmitter<MouseEvent>) {

    }


    onDragStart(event: EventEmitter<MouseEvent>) {
        console.log(event);
    }
    //
    // getBounds(): Promise<LatLngBounds> { return this._manager.getBounds(this.circle); }
}
