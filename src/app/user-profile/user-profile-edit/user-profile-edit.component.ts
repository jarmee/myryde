import { Component, OnInit } from '@angular/core';
import { getFileSourceFromFilePicker } from '../../utils/file-upload';
import { DataService } from 'src/app/shared/services/data.service';
import { User, UserFormModel } from 'src/app/shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck, tap, switchMap, withLatestFrom, map, concatMap, combineLatest } from 'rxjs/operators';
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

  onSubmit(user: UserFormModel) {
    user.id = this.route.snapshot.paramMap.get('id');
    const car = user.car;
    delete user.car;
    this.dataService.updateUser(user).pipe(
      switchMap(() => this.dataService.updateCar(car))
    ).subscribe({
      next: () => this.router.navigate(['/userprofile', user.id])
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      gender: [''],
      location: [''],
      country: [''],
      picture: [''],
      car: ['']
    });
    this.route.params.pipe(
      pluck('id'),
      switchMap((id: string) => this.dataService.getUserById(id)),
      map(user => <UserFormModel>user),
      concatMap((user: User) => this.dataService.getCarByUserId(user.id)
        .pipe(map(car => ({ ...user, car }))))
    ).subscribe((user) => {
      this.form.patchValue(user);
    });
  }
}
