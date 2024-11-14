import type { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addValueSchema } from '@value/schema/value';
import { valueService } from '@service/db/value.service';
import type { IValue } from '@value/interfaces/value.interface';


export class Create {
  @joiValidation(addValueSchema)
  public async value(req: Request, res: Response): Promise<void> {
    const { value, name } = req.body;

    const valueCreate: IValue = {
      name,
      value
    } as IValue;

    await valueService.createValue(valueCreate);

    res.status(HTTP_STATUS.CREATED).json({ message: 'Value created successfully ' });
  }

}
