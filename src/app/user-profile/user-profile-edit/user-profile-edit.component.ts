import { Component, OnInit } from '@angular/core';
import { getFileSourceFromFilePicker } from '../../utils/file-upload';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  src$: any;

  constructor() { }


  changeProfilePicture(event: any) {
    this.src$ = getFileSourceFromFilePicker(event);
  }

  ngOnInit() {
  }

}
