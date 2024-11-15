import { Response, NextFunction, Request } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  let errorObj;
  if (err && err.status) {
    errorObj = {
      name: err.name,
      uc: err.code,
      type: err.type,
      message: err.message,
      timestamp: err.timestamp,
      paramMap: err.paramMap,
      cause: err.cause
    };

    res.status(err.status).send(errorObj);
  } else {
    errorObj = { e: err.message, stack: err.stack };
    res.status(500).send(errorObj);
  }
  console.error(JSON.stringify(errorObj));
};
