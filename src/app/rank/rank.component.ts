import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { DataService } from '../shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  topUsers$: Observable<User[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.topUsers$ = this.dataService.getTopUsers();
  }

}
