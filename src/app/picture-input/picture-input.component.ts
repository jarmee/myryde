import { Component, OnInit } from '@angular/core';
import { getFileSourceFromFilePicker } from '../utils/file-upload';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-picture-input',
  templateUrl: './picture-input.component.html',
  styleUrls: ['./picture-input.component.css'],
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

  onChangeCallback = (_: any) => { };
  onTouchedCallback = () => { };

  constructor() { }

  ngOnInit() {
  }

  changePictureFromUserPick(event: any) {
    const observable = getFileSourceFromFilePicker(event);
    if (observable) {
      getFileSourceFromFilePicker(event)
        .subscribe(src => {
          this.src = src;
          this.onChangeCallback(src);
        });
    }

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
