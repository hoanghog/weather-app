import axios from 'axios';
import config from 'config';

const apiKey = config.get<string>('google-map.api-key');

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: string;
}

class GoogleMap {
  private _uri: string;
  constructor() {
    this._uri = 'https://maps.googleapis.com/maps/api/geocode/json';
  }

  private get uri() {
    return this._uri;
  }

  async getLocationByAddress(address: string) {
    const result = (
      await axios.request<GeocodeResponse>({
        method: 'GET',
        url: `${this._uri}`,
        params: {
          address,
          key: apiKey
        }
      })
    ).data;

    if (result.status !== 'OK' || result.results.length === 0) {
      throw new Error('Could not find address.');
    }

    return result.results[0].geometry.location;
  }
}

export default new GoogleMap();
