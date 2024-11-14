import type { ObjectId } from "mongodb";


export interface IValue extends Document {
  _id?: ObjectId | string;
  value: number;
  name: string;
}


export interface IValueJob {
  _id?: string;
  key?: string;
  value?: number;
  name?: string;
}
