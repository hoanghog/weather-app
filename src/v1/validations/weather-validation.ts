import Validator from '#lib/validator';
import Joi from 'joi';

const getByAddress = async (dtoIn: Record<string, any>) => {
  const validCities = ['Bratislava', 'Prague', 'Warsaw', 'Paris', 'Munich'];
  const validator = Joi.object({
    location: Joi.string()
      .valid(...validCities)
      .required(),
    type: Joi.string().valid('factual', 'tabloid').required(),
    language: Joi.string().valid('sk', 'en').required()
  });

  return Validator.validate(validator, dtoIn);
};

export default { getByAddress };
