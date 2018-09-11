import {AbstractControl} from "@angular/forms";
import {Observable, Observer} from "rxjs";

export const mimeType = (
    control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    const files = control.value;

    return Observable.create((observer: Observer<{ [key: string]: any }>) => {
        let isValid = false;
        if (files) {
            let validCount = 0;
            const promise = new Promise((resolve, reject) => {

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

                        if(isValid) {
                            validCount++;
                        }

                        if(validCount === files.length) {
                            resolve(validCount);
                        }

                        console.log("i", i);
                        console.log("files", files.length - 1);
                        if(i === files.length - 1 && validCount < files.length) {
                            reject(validCount);
                        }

                    });

                    fileReader.readAsArrayBuffer(files[i]);
                }
            });

            promise.then(validCount => {
                console.log("resolve", validCount);
                observer.next(null);
                observer.complete();
            }, err => {
                console.log("reject", validCount);
                observer.next({invalidMimeType: true});
                observer.complete();
            });
        }
    });
};