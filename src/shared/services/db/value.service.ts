import { type IValue } from '@value/interfaces/value.interface';
import { ValueModel } from '@value/models/value.schema';

class ValueService {
  // create new value
  public async createValue(value: IValue): Promise<void> {
    await ValueModel.create(value);
  }

  // get all values use aggregate
  public async getValues(): Promise<IValue[]> {
    let values: IValue[];
    values = (await ValueModel.aggregate([
      {
        $project: {
          _id: 1,
          value: 1,
          name: 1,
        },
      },
    ])) as IValue[];

    return values;
  }

  // get value by id
  public async getValueById(valueId: string): Promise<IValue> {
    let value: IValue;
    value = (await ValueModel.findById(valueId)) as IValue;

    return value;
  }

  // update value by id
  public async updateValueById(valueId: string, value: IValue): Promise<void> {
    await ValueModel.findByIdAndUpdate(valueId, value);
  }

  // delete value by id
  public async deleteValueById(valueId: string): Promise<void> {
    await ValueModel.findByIdAndDelete(valueId);
  }
}

export const valueService: ValueService = new ValueService();
