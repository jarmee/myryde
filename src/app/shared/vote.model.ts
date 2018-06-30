export interface Vote {
  type: VoteType;
  userId: string;
  carId: string;
}

export enum VoteType {
  Up = 1,
  Down = -1
}

export interface Score {
  userId: string;
  value: number;
}
