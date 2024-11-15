import Validator from '#lib/validator';
import Joi from 'joi';

const getByAddress = async (dtoIn: Record<string, any>) => {
  const validator = Joi.object({
    address: Joi.string().required(),
    type: Joi.string().valid('factual', 'tabloid').required(),
    language: Joi.string().valid('sk', 'en').required()
  });

  return Validator.validate(validator, dtoIn);
};

export default { getByAddress };
