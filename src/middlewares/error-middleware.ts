import { Response, NextFunction, Request } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  let errorObj;
  if (err && err.status) {
    const { status, ...error } = err;
    errorObj = error;

    if (error?.paramMap?.stack) {
      delete error.paramMap.stack;
    }

    res.status(status).send(error);
  } else {
    errorObj = { e: err.message, name: err.name };
    res.status(500).send(errorObj);
  }
  console.error(JSON.stringify(errorObj));
};
