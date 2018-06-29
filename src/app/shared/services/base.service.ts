import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export abstract class BaseService<T> {

  constructor(protected collection: string, protected afs: AngularFirestore) {
  }

  getById(id: string) {
    return this.afs.doc<T>(`${this.collection}/${id}`).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }

  getAll() {
    return this.afs.collection<T>(this.collection).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  create() {

  }

  update() {

  }

  delete() {}

}
