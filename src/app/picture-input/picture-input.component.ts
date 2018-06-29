import { Component, OnInit } from '@angular/core';
import { getFileSourceFromFilePicker } from '../utils/file-upload';

@Component({
  selector: 'app-picture-input',
  templateUrl: './picture-input.component.html',
  styleUrls: ['./picture-input.component.css']
})
export class PictureInputComponent implements OnInit {

  src: any;

  constructor() { }

  ngOnInit() {
  }

  changePictureFromUserPick(event: any) {
    getFileSourceFromFilePicker(event).subscribe(src => this.src = src);
  }

}
