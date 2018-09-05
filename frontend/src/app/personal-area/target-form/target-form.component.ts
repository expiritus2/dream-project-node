import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';

@Component({
    selector: 'app-target-form',
    templateUrl: './target-form.component.html',
    styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {

    public previewTargetImages: string[] = [];

    @Output() closeForm = new EventEmitter<boolean>();

    public options= ["one", "two"];
    public today: string = moment().format('YYYY-MM-DDTHH:mm');


    public form: FormGroup;
    public isSubmit: boolean = false;

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
            datetime: new FormControl(null, {
                validators: [Validators.required]
            }),
            targetImage: new FormControl(null, {})
        });
    }

    onSubmit() {
        this.isSubmit = true;
    }

    onCloseForm(event: any) {
        const isClose = [].includes.call(event.target.classList, "close");
        const isOpacityLayout = [].includes.call(event.target.classList, "opacity-layout");
        if(isClose || isOpacityLayout) {
            this.closeForm.emit(true)
        }
    }


    onImagePicked(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        this.form.patchValue({targetImage: files});
        this.form.get('targetImage').updateValueAndValidity();
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                this.previewTargetImages.push(reader.result);
            };

            reader.readAsDataURL(files[i]);
        }
    }

    isInvalid(fieldName: string) {
        return this.isSubmit ? this.form.get(fieldName).errors : this.form.get(fieldName).invalid
            && this.form.get(fieldName).touched
            && this.form.get(fieldName).errors
            && this.form.touched

    }

}
