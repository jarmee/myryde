import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/car.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  car: Car = {
    pictures: ['https://i.pinimg.com/736x/2d/c7/72/2dc772ca80d8adb6a169a3815c46e284--matte-black-cars-matte-cars.jpg'],
    brand: 'BMW',
    model: '7',
    engine: 'What ever',
    topSpeed: 300,
    acceleration: 3,
    userId: '',
    id: '',
    description: `Lorem ipsum dolor amet leggings hella green juice mlkshk tilde scenester.
                  Before they sold out skateboard retro, farm-to-table salvia unicorn air
                  plant fam. Meditation fashion axe seitan tumeric raclette banjo street art.
                  Mumblecore af cold-pressed coloring book pug chia.`,
  };

  constructor() { }

  ngOnInit() {

  }

}
