import ValidatorClass from '#lib/validator';
import config from 'config';

import WeatherValidations from '#v1-validations/weather-validation';

const applicationName = config.get<string>('applicationName');

const Validator = new ValidatorClass(applicationName);

Validator.addValidator('weather', WeatherValidations);

export default Validator;
