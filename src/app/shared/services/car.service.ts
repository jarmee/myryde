import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Car } from 'src/app/shared/car.model';
import { FirebaseFirestore } from 'angularfire2';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService<Car> {
  constructor(private store: AngularFirestore) {
    super('/cars', store);
  }

  getByUserId(userId: string): Observable<Car> {
    return this.store.collection<Car>('/cars', (ref) => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Car>[]) => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      map((cars) => cars[0]),
    );
  }
}
}
