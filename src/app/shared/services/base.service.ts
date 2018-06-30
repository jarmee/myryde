import { AngularFirestore } from 'angularfire2/firestore';
import { map, mapTo } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

export interface Document {
  id: any;
}

export abstract class BaseService<T extends Document> {

  constructor(protected collection: string, protected afs: AngularFirestore) {
  }

  getById(id: string) {
    return this.afs.doc<T>(`${this.collection}/${id}`).snapshotChanges().pipe(
      map(action => {
        const data: any = action.payload.data();
        const docId = action.payload.id;
        return { docId, ...data };
      })
    );
  }

  getAll() {
    return this.afs.collection<T>(this.collection).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  create(payload: Partial<T>): Observable<void> {
    return from(this.afs.collection<T>(this.collection).doc(payload.id).set(payload));
  }

  createWithId(payload: T): Observable<void> {
    return from(this.afs.collection<T>(this.collection).add(payload)).pipe(
      mapTo(null)
    );
  }

  update(payload: Partial<T>): Observable<void> {
    return from(this.afs.collection<T>(this.collection).doc(payload.id).update(payload));
  }

  delete() {}

}
