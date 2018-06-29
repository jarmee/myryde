import { Component, OnInit } from '@angular/core';
import { getFileSourceFromFilePicker } from '../../utils/file-upload';
import { DataService } from 'src/app/shared/services/data.service';
import { User } from 'src/app/shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck, tap, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  onSubmit(user: User) {
    user.id = this.route.snapshot.paramMap.get('id');
    this.dataService.updateUser(user)
      .subscribe({
        next: () => this.router.navigate(['/userprofile', user.id])
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      gender: [''],
      location: [''],
      country: [''],
      picture: ['']
    });
    this.route.params.pipe(
      pluck('id'),
      switchMap((id: string) => this.dataService.getUserById(id))
    ).subscribe((user) => this.form.patchValue(user));
  }
}
