import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    constructor(private afStorage: AngularFireStorage) {
    }


    upload(file: File): Promise<any> {
        return this.afStorage.upload('/upload/images/' + file.name, file).then(val => val.ref.getDownloadURL());
    }

}
