import { Document } from '../shared/services/base.service';

export interface User extends Document {
  id: string;
  name?: string;
  picture?: string;
  location?: string;
  gender?: string;
}
