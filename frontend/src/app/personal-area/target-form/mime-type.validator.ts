import {AbstractControl} from "@angular/forms";
import {Observable, Observer} from "rxjs";

export const mimeType = (
    control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    const files = control.value;
    let isValid = false;

    if (files) {
        for (let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            fileReader.addEventListener("loadend", () => {
                const arr = new Uint8Array(fileReader.result).subarray(0, 4);
                let header = "";

                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                switch (header) {
                    case "89504e47":
                        isValid = true;
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        isValid = true;
                        break;
                    default:
                        isValid = false;
                        break;
                }
            });

            fileReader.readAsArrayBuffer(files[i]);
        }
    }

    return Observable.create((observer: Observer<{ [key: string]: any }>) => {
        if (isValid) {
            observer.next(null);
        } else {
            observer.next({invalidMimeType: true});
        }
        observer.complete();
    });
};