import Joi, { type ObjectSchema } from 'joi';


export const addValueSchema: ObjectSchema = Joi.object({
  value: Joi.number().required(),
  name: Joi.string().required()
});
