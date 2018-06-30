import { Document } from './services/base.service';

export interface Vote extends Document {
  type?: VoteType;
  userId?: string;
  carId?: string;
  timestamp?: number;
}

export enum VoteType {
  Up = 1,
  Down = -1
}

export interface Score {
  userId: string;
  value: number;
}
