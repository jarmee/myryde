import { Observable, Subject } from "rxjs";


export function getFileSourceFromFilePicker(event: any): Observable<string> {
    const observer = new Subject<string>();

    const fReader = new FileReader();
    fReader.readAsDataURL(event.target.files[0]);
    fReader.onloadend = function (innerEvent: any) {
        observer.next(innerEvent.target.result);
    };
    return observer.asObservable();
}
