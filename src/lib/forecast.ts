import axios from 'axios';
import config from 'config';

const apiKey = config.get<string>('weather.api-key');

interface ForecastResponse {
  [key: string]: unknown;
  hourly: {
    dt: number;
    [key: string]: unknown;
  }[];
  cod?: string;
  message: string;
}

class Forecast {
  private _uri: string;
  constructor() {
    this._uri = 'https://api.openweathermap.org/data/3.0/onecall';
  }

  private get uri() {
    return this._uri;
  }

  async getByLocation(lat: number, lon: number, interval?: { from: Date; to: Date }) {
    const result = (
      await axios.request<ForecastResponse>({
        method: 'GET',
        url: `${this._uri}`,
        params: {
          exclude: 'current,minutely,daily,alerts',
          lat,
          lon,
          appid: apiKey
        }
      })
    ).data;

    if (result.cod && result.cod === '400') {
      throw new Error(`Could not retrieve forecast. ${result.message}`);
    }

    if (interval) {
      return {
        ...result,
        hourly: result.hourly.filter(h => h.dt >= interval.from.getTime() / 1000 && h.dt <= interval.to.getTime() / 1000)
      };
    }

    return result;
  }
}

export default new Forecast();
