import config from 'config';

const applicationName = config.get<string>('applicationName');

class Service {
  constructor(private _serviceName: string) {}

  protected createError(name: string, message: string, status = 400, paramMap?: Error | Record<string, unknown>) {
    if (paramMap && paramMap instanceof Error) {
      paramMap = { message: paramMap.message, name: paramMap.name, stack: paramMap.stack };
    }

    const ucName = this.getUCName();

    return {
      name,
      message,
      uc: `${applicationName}/${ucName ? ucName : this._serviceName}/${name}`,
      paramMap,
      timestamp: new Date(),
      status
    };
  }

  private getUCName(): string | undefined {
    const error = new Error();
    const stack = error.stack;

    if (!stack) {
      return undefined;
    }

    const stackLines = stack.split('\n');

    const callerLine = stackLines[3];

    if (!callerLine) {
      return undefined;
    }

    const match = callerLine.match(/at (\S+)/);
    return match ? match[1] : undefined;
  }
}

export default Service;
