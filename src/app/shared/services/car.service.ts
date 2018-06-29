import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Car } from 'src/app/shared/car.model';
import { FirebaseFirestore } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService<Car> {
    constructor(store: AngularFirestore) {
      super('/cars', store);
    }
}
