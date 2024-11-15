import OpenAI from '#lib/open-ai';
import Forecast from '#lib/forecast';

class WeatherService {
  async getByAddress(address: string, type: 'factual' | 'tabloid', language: 'sk' | 'en') {
    let forecast;
    try {
      forecast = await Forecast.getLocationByAddress(address);
    } catch (e: any) {
      throw new Error(e);
    }

    let news;
    try {
      news = await OpenAI.generateForecast(forecast, type, language);
    } catch (e: any) {
      throw new Error(e);
    }

    return { news };
  }
}

export default new WeatherService();
