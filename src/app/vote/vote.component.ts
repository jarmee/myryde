import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/car.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  car: Car;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.fetchRandom();
  }

  upVote() {
    this.fetchRandom();
  }

  downVote() {
    this.fetchRandom();
  }

  fetchRandom() {
    this.service.getCarToVote().subscribe((car) => {
      console.log(car);
      this.car = car;
    });
  }

}
