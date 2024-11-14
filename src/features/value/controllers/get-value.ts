import type { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { valueService } from '@service/db/value.service';


export class GetValueController {
  public async getValues(req: Request, res: Response): Promise<void> {

    const values = await valueService.getValues();
    res.status(HTTP_STATUS.OK).json({ message: 'All Values', values });

  }

  public async getValueById(req: Request, res: Response): Promise<void> {

    const valueId = req.params.id;
    const value = await valueService.getValueById(valueId);
    res.status(HTTP_STATUS.OK).json({ message: 'Value By Id', value });

  }
}
