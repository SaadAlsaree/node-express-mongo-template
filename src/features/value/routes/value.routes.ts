import express, { Router } from 'express';

import { GetValueController } from '@value/controllers/get-value';
import { Create } from '@value/controllers/create-value';


class ValueRoutes {
  private router = Router();
  /**
   *
   */
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/values', GetValueController.prototype.getValues);
    this.router.get('/values/:id', GetValueController.prototype.getValueById);
    this.router.post('/values', Create.prototype.value);
    return this.router;
  }
}



export const valueRoutes: ValueRoutes = new ValueRoutes();
