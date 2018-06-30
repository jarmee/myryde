import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Vote, VoteType } from '../vote.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Car } from '../car.model';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VoteService extends BaseService<Vote> {

    constructor(private store: AngularFirestore, private authService: AuthService) {
        super('/votes', store);
    }

    createNewVote(userId, car: Car, vote: VoteType): Observable<void> {
        const toCreate = ({ userId: userId, carId: car.id, type: vote, timestamp: Date.now() });
        return super.createWithId(toCreate);
    }

    private getUserVotes(userId): Observable<Vote[]> {
        return super.getByQuery('userId', '==', userId);
    }

    getMyVotes(): Observable<Vote[]> {
        return this.getUserVotes(this.authService.loggedInUserId);
    }

}
