import OpenAI from '#lib/open-ai';
import Forecast from '#lib/forecast';
import ServiceClass from '#lib/service-class';

class WeatherService extends ServiceClass {
  async getByAddress(address: string, type: 'factual' | 'tabloid', language: 'sk' | 'en') {
    let forecast;
    try {
      forecast = await Forecast.getByAddress(address);
    } catch (e: any) {
      throw this.createError('ForecastGetByAddressFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    let news;
    try {
      news = await OpenAI.generateForecast(forecast, type, language);
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    return { news };
  }
}

export default new WeatherService('WeatherService');
