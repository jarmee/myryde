import { Component, OnInit } from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-car-input',
  templateUrl: './car-input.component.html',
  styleUrls: ['./car-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CarInputComponent,
      multi: true
    }
  ]
})
export class CarInputComponent implements OnInit, ControlValueAccessor{

  carFormGroup: FormGroup;
  registerChange: Function;
  registerTouch: Function;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.carFormGroup = this.fb.group({
      picture: '',
      brand: ['', Validators.required],
      model: '',
      engine: '',
      topSpeed: '',
      acceleration: '',
      description: ''
    });

  }

  registerOnChange(fn: any): void {
    this.registerChange = fn;
    this.carFormGroup.valueChanges.subscribe(
      (value) => this.registerChange(value)
    );
  }

  registerOnTouched(fn: any): void {
    this.registerTouch = fn;
  }

  writeValue(obj: any): void {
    this.carFormGroup.patchValue(obj || this.carModel());
  }

  carModel() {
    return {
      picture: '',
      brand: '',
      model: '',
      engine: '',
      topSpeed: '',
      acceleration: '',
      description: ''
    };
  }

}
