import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
    selector: 'app-target-form',
    templateUrl: './target-form.component.html',
    styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {
    @ViewChild('next') nextButton: ElementRef;

    public formElements: ElementRef[] = [];
    public currentElIndex: number = 0;
    public previewTargetImages: string[] = [];

    public form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({
            targetName: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            targetDescription: new FormControl(null, {
                validators: [Validators.required]
            }),
            targetImage: new FormControl(null, {
                validators: [Validators.required]
            })
        });
    }

    onClickPrev() {
        // this.formElements[this.currentElIndex].nativeElement.style.display = 'none';
        // this.formElements[this.currentElIndex > 0 ? --this.currentElIndex : 0].nativeElement.style.display = 'block';
        // this.nextButton.nativeElement.style.display = 'block';
    }

    onClickNext() {
        // if(this.currentElIndex < this.formElements.length - 1) {
        //     this.formElements[this.currentElIndex].nativeElement.style.display = 'none';
        //     this.formElements[this.currentElIndex + 1].nativeElement.style.display = 'block';
        //     this.currentElIndex++;
        // }
        //
        // if(this.currentElIndex == this.formElements.length - 1){
        //     this.nextButton.nativeElement.style.display = 'none';
        // }
    }

    onClickFinish() {

    }

    onSubmit() {

    }

    onImagePicked(event: Event){
        const files = (event.target as HTMLInputElement).files;
        this.form.patchValue({targetImage: files});
        this.form.get('targetImage').updateValueAndValidity();
        for(let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                this.previewTargetImages.push(reader.result);
            };

            reader.readAsDataURL(files[i]);
        }
    }

    isInvalid(fieldName: string){
        return this.form.get(fieldName).invalid
            && this.form.touched
            && this.form.get(fieldName).errors
    }

}
