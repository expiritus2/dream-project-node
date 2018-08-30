import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-target-form',
    templateUrl: './target-form.component.html',
    styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {
    @ViewChild('targetName') targetName: ElementRef;
    @ViewChild('targetImage') targetImage: ElementRef;
    @ViewChild('next') nextButton: ElementRef;

    public formElements: ElementRef[] = [];
    public currentElIndex: number = 0;

    public options: string[];

    constructor() {
    }

    ngOnInit() {
        this.targetImage.nativeElement.style.display = 'none';
        this.formElements = [
            this.targetName,
            this.targetImage
        ]
    }

    onClickPrev() {
        this.formElements[this.currentElIndex].nativeElement.style.display = 'none';
        this.formElements[this.currentElIndex > 0 ? --this.currentElIndex : 0].nativeElement.style.display = 'block';
        this.nextButton.nativeElement.style.display = 'block';
    }

    onClickNext() {
        if(this.currentElIndex < this.formElements.length - 1) {
            this.formElements[this.currentElIndex].nativeElement.style.display = 'none';
            this.formElements[this.currentElIndex + 1].nativeElement.style.display = 'block';
            this.currentElIndex++;
        }

        if(this.currentElIndex == this.formElements.length - 1){
            this.nextButton.nativeElement.style.display = 'none';
        }
    }

    onClickFinish() {

    }

    onSubmit(form: HTMLFormElement) {
    }

}
