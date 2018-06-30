import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { UploadService } from '../shared/services/upload.service';

@Component({
  selector: 'app-picture-input',
  templateUrl: './picture-input.component.html',
  styleUrls: ['./picture-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PictureInputComponent,
      multi: true
    }
  ]
})
export class PictureInputComponent implements OnInit, ControlValueAccessor {

  src: any;
  id: string;

  onChangeCallback = (_: any) => { };
  onTouchedCallback = () => { };

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.id = (Math.random() * 1000) + '';
  }

  changePictureFromUserPick(event: any) {

    this.uploadService.upload(event.target.files[0]).then(val => {
      this.src = val;
      console.log(val);
      this.onChangeCallback(val);
    });

    // const observable = getFileSourceFromFilePicker(event);
    // if (observable) {
    //   getFileSourceFromFilePicker(event)
    //     .subscribe(src => {
    //       this.src = src;
    //       this.onChangeCallback(src);
    //     });
    // }

  }

  writeValue(obj: any): void {
    this.src = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

}

function getFileSourceFromFilePicker(event: any): Observable<string> {
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
