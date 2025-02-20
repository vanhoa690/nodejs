import Joi from "joi";

const productValidateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().greater(0).required(),
});

export { productValidateSchema };
