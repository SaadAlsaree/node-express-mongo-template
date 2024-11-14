import { Schema, model, Model } from 'mongoose';

import { type IValue } from '@value/interfaces/value.interface';



const ValueSchema: Schema = new Schema({
    value: { type: Number, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);


const ValueModel: Model<IValue> = model<IValue>('Value', ValueSchema, 'values');

export { ValueModel };
