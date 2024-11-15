import Validator from '#lib/validator';
import Joi from 'joi';

const getByLocation = async (dtoIn: Record<string, any>) => {
  const validator = Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    type: Joi.string().valid('factual', 'tabloid').required(),
    language: Joi.string().valid('sk', 'en').required(),
    date: Joi.date().required()
  });

  return Validator.validate(validator, dtoIn);
};

const getByAddress = async (dtoIn: Record<string, any>) => {
  const validator = Joi.object({
    address: Joi.string().required(),
    type: Joi.string().valid('factual', 'tabloid').required(),
    language: Joi.string().valid('sk', 'en').required(),
    date: Joi.date().required()
  });

  return Validator.validate(validator, dtoIn);
};

export default { getByLocation, getByAddress };
