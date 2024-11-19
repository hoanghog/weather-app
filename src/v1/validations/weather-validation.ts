import Validator from '#lib/validator';
import Joi from 'joi';

const get = async (dtoIn: Record<string, any>) => {
  const validator = Joi.object({
    location: Joi.string().required(),
    type: Joi.string().valid('factual', 'tabloid').default('factual'),
    language: Joi.string().valid('sk', 'en').default('sk')
  });

  return Validator.validate(validator, dtoIn);
};

const getHistorical = async (dtoIn: Record<string, any>) => {
  const validCities = ['Bratislava', 'Prague', 'Warsaw', 'Paris', 'Munich', 'tr'];
  const validator = Joi.object({
    location: Joi.string()
      .valid(...validCities)
      .required(),
    type: Joi.string().valid('factual', 'tabloid').default('factual'),
    language: Joi.string().valid('sk', 'en').default('sk'),
    date: Joi.date().min('11-16-2024').required()
  });

  return Validator.validate(validator, dtoIn);
};

export default { get, getHistorical };
