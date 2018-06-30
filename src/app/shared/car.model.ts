import { Document } from './services/base.service';

export interface Car extends Document {
  pictures?: string[];
  brand?: string;
  model?: string;
  engine?: string;
  topSpeed?: number;
  acceleration?: number;
  userId: string;
  description?: string;
}
