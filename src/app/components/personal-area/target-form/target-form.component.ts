import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "./mime-type.validator";
import {TargetService} from "../../../services/target.service";

@Component({
    selector: 'app-target-form',
    templateUrl: './target-form.component.html',
    styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {

    public previewTargetImages: string[] = [];

    @Output() closeForm = new EventEmitter<{ close: boolean, targetAdded: boolean }>();

    public options = ["one", "two"];
    public serverError: boolean = false;

    public form: FormGroup;
    public isSubmit: boolean = false;

    @Input() coords: {lat: number, lng: number};

    constructor(private targetService: TargetService) {
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
            targetImage: new FormControl(null, {
                asyncValidators: [mimeType]
            })
        });
    }

    onSubmit() {
        this.isSubmit = true;
        const {targetName, targetDescription, datetime, targetImage} = this.form.value;
        const {controls} = this.form;
        let isErrorExist = this.checkErrors(controls);

        if (!isErrorExist) {
            this.targetService.sendTarget(targetName, targetDescription, new Date(datetime).getTime(), targetImage, this.coords)
                .subscribe(response => {
                        this.closeForm.emit({close: true, targetAdded: true});
                        console.log(response);
                    },
                    err => {
                        this.serverError = true
                    })
        }

    }

    private checkErrors(controls: object){
        let isErrorExist = false;
        Object.keys(controls).forEach(key => {
            if (controls[key].errors) {
                isErrorExist = true;
            }
        });

        return isErrorExist;
    }

    onCloseForm(event: any) {
        const isClose = [].includes.call(event.target.classList, "close");
        const isOpacityLayout = [].includes.call(event.target.classList, "opacity-layout");
        if (isClose || isOpacityLayout) {
            this.closeForm.emit({close: true, targetAdded: false})
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
