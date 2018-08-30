export class Circle {
    constructor(public lat: number,
                public lng: number,
                public circleBounds: object = null,
                public isShow: boolean = true) {}

    setBounds(bounds: object){
        this.circleBounds = bounds;
    }
}