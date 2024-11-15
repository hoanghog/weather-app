import axios from 'axios';
import config from 'config';

const apiKey = config.get<string>('weather.api-key');

interface ForecastResponse {
  request: Record<string, string>;
  location: Record<string, string | number>;
  current: Record<string, string | object | number | Array<string>>;
  error: Record<string, string>;
}

class Forecast {
  private _uri: string;
  constructor() {
    this._uri = 'http://api.weatherstack.com/current';
  }

  private get uri() {
    return this._uri;
  }

  async getLocationByAddress(address: string) {
    const result = (
      await axios.request<ForecastResponse>({
        method: 'GET',
        url: `${this._uri}`,
        params: {
          query: address,
          access_key: apiKey
        }
      })
    ).data;

    if (result.error) {
      throw new Error('Could not retrieve forecast.');
    }

    return result;
  }
}

export default new Forecast();
