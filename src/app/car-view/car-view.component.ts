import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../shared/car.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit {

  @Input() car: Car;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
