import config from 'config';

const applicationName = config.get<string>('applicationName');

class Service {
  constructor(private _serviceName: string) {}

  createError(name: string, message: string, status = 400, paramMap?: Error | Record<string, unknown>) {
    if (paramMap && paramMap instanceof Error) {
      paramMap = { message: paramMap.message, name: paramMap.name, stack: paramMap.stack };
    }

    return {
      name,
      message,
      uc: `${applicationName}/${this._serviceName}/${name}`,
      paramMap,
      timestamp: new Date(),
      status
    };
  }
}

export default Service;
