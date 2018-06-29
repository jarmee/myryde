import { Observable, Subject } from "rxjs";


export function getFileSourceFromFilePicker(event: any): Observable<string> {
    const observer = new Subject<string>();

    const fReader = new FileReader();
    if (event.target.files[0]) {


        fReader.readAsDataURL(event.target.files[0]);
        fReader.onloadend = function (innerEvent: any) {
            observer.next(innerEvent.target.result);
        };
    } else {
        return null;
    }
    return observer.asObservable();
}
