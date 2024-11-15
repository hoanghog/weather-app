import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

class Validator {
  constructor(private applicationName: string) {}

  private validator: Record<string, Record<string, (dtoIn: any) => Promise<any>>> = {};

  /**
   * Add entity validator into global validator
   * @param entity - or route
   * @param validators - object with validator for given entity
   */
  addValidator(entity: string, validators: Record<string, (dtoIn: any) => Promise<any>>) {
    this.validator[entity] = validators;
  }

  private getValidator(entity: string, name: string) {
    if (!this.validator[entity]) {
      throw new Error(`Entity ${entity} validator does not exist.`);
    }
    if (!this.validator[entity][name]) {
      throw new Error(`Entity ${entity} validator with name ${name} does not exist.`);
    }

    return this.validator[entity][name];
  }

  /**
   * Validate query.
   * @param entity
   * @param name
   */
  validateQuery = (entity: string, name: string) => {
    const validator = this.getValidator(entity, name);

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validator(req.query);
      } catch (e: any) {
        if (e.isJoi) {
          throw this.createError(req, 422, 'ValidationError', 'Validation error.', e.details);
        } else {
          throw this.createError(req, 500, 'ApplicationError', 'Something went wrong.', e);
        }
      }

      return next();
    };
  };

  /**
   * Static validate method to use in application.
   * @param validator
   * @param dtoIn
   */
  static async validate(validator: ObjectSchema, dtoIn: Record<string, any>) {
    return validator.validateAsync(dtoIn, {
      abortEarly: false,
      stripUnknown: true
    });
  }

  private createError(req: Request, status: number, name: string, message: string, paramMap?: any) {
    const route = `${req.baseUrl}${req.route.path !== '/' ? req.route.path : ''}`;

    if (paramMap && paramMap instanceof Error) {
      paramMap = { message: paramMap.message, name: paramMap.name, stack: paramMap.stack };
    }
    return {
      name,
      message,
      paramMap,
      uc: `${this.applicationName}${route}/${name}`,
      timestamp: new Date(),
      status
    };
  }
}

export default Validator;
