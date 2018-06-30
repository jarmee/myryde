import { Document } from '../shared/services/base.service';
import { Car } from 'src/app/shared/car.model';

export interface User extends Document {
  id: string;
  name?: string;
  picture?: string;
  location?: string;
  gender?: string;
  score?: number;
}

export interface UserFormModel extends User {
  car?: Car;
}
