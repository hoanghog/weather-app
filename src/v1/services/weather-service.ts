import OpenAI from '#lib/open-ai';
import Forecast from '#lib/forecast';
import GoogleMap from '#lib/google-map';

import ServiceClass from '#lib/service-class';

import ForecastDB from '#v1-database/forecast-db';

import { Create } from '#v1-dbInterfaces/forecast';

class WeatherService extends ServiceClass {
  async getByAddress(address: string, type: 'factual' | 'tabloid', language: 'sk' | 'en') {

    let forecast;
    try {
      // forecast = await Forecast.getByAddress(address);
    } catch (e: any) {
      throw this.createError('ForecastGetByAddressFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    forecast = {
      "lat": 33.44,
      "lon": -94.04,
      "timezone": "America/Chicago",
      "timezone_offset": -21600,
      "hourly": [
          {
              "dt": 1731740400,
              "temp": 281.65,
              "feels_like": 280.27,
              "pressure": 1017,
              "humidity": 82,
              "dew_point": 278.76,
              "uvi": 0,
              "clouds": 0,
              "visibility": 10000,
              "wind_speed": 2.4,
              "wind_deg": 119,
              "wind_gust": 2.56,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731744000,
              "temp": 281.51,
              "feels_like": 280.04,
              "pressure": 1017,
              "humidity": 83,
              "dew_point": 278.8,
              "uvi": 0,
              "clouds": 0,
              "visibility": 10000,
              "wind_speed": 2.49,
              "wind_deg": 123,
              "wind_gust": 2.72,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731747600,
              "temp": 281.53,
              "feels_like": 279.87,
              "pressure": 1017,
              "humidity": 84,
              "dew_point": 278.99,
              "uvi": 0,
              "clouds": 0,
              "visibility": 10000,
              "wind_speed": 2.76,
              "wind_deg": 122,
              "wind_gust": 3.82,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731751200,
              "temp": 281.44,
              "feels_like": 279.71,
              "pressure": 1017,
              "humidity": 85,
              "dew_point": 279.07,
              "uvi": 0,
              "clouds": 0,
              "visibility": 10000,
              "wind_speed": 2.84,
              "wind_deg": 124,
              "wind_gust": 4.09,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731754800,
              "temp": 281.29,
              "feels_like": 279.6,
              "pressure": 1016,
              "humidity": 88,
              "dew_point": 279.42,
              "uvi": 0,
              "clouds": 1,
              "visibility": 10000,
              "wind_speed": 2.74,
              "wind_deg": 125,
              "wind_gust": 4.03,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731758400,
              "temp": 281.04,
              "feels_like": 279.45,
              "pressure": 1017,
              "humidity": 90,
              "dew_point": 279.5,
              "uvi": 0,
              "clouds": 2,
              "visibility": 10000,
              "wind_speed": 2.53,
              "wind_deg": 126,
              "wind_gust": 3.54,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731762000,
              "temp": 280.83,
              "feels_like": 279.22,
              "pressure": 1017,
              "humidity": 91,
              "dew_point": 279.57,
              "uvi": 0,
              "clouds": 7,
              "visibility": 10000,
              "wind_speed": 2.51,
              "wind_deg": 122,
              "wind_gust": 3.29,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731765600,
              "temp": 282.97,
              "feels_like": 281.83,
              "pressure": 1018,
              "humidity": 84,
              "dew_point": 280.38,
              "uvi": 0.28,
              "clouds": 9,
              "visibility": 10000,
              "wind_speed": 2.4,
              "wind_deg": 127,
              "wind_gust": 4.66,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731769200,
              "temp": 285.95,
              "feels_like": 285.17,
              "pressure": 1018,
              "humidity": 72,
              "dew_point": 281.06,
              "uvi": 1.07,
              "clouds": 9,
              "visibility": 10000,
              "wind_speed": 2.96,
              "wind_deg": 137,
              "wind_gust": 4.57,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731772800,
              "temp": 288.51,
              "feels_like": 287.75,
              "pressure": 1017,
              "humidity": 63,
              "dew_point": 281.63,
              "uvi": 2.36,
              "clouds": 13,
              "visibility": 10000,
              "wind_speed": 3.22,
              "wind_deg": 140,
              "wind_gust": 4.9,
              "weather": [
                  {
                      "id": 801,
                      "main": "Clouds",
                      "description": "few clouds",
                      "icon": "02d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731776400,
              "temp": 290.62,
              "feels_like": 289.91,
              "pressure": 1017,
              "humidity": 57,
              "dew_point": 282.11,
              "uvi": 3.64,
              "clouds": 13,
              "visibility": 10000,
              "wind_speed": 3.51,
              "wind_deg": 143,
              "wind_gust": 5.07,
              "weather": [
                  {
                      "id": 801,
                      "main": "Clouds",
                      "description": "few clouds",
                      "icon": "02d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731780000,
              "temp": 292.32,
              "feels_like": 291.68,
              "pressure": 1016,
              "humidity": 53,
              "dew_point": 282.5,
              "uvi": 4.36,
              "clouds": 13,
              "visibility": 10000,
              "wind_speed": 3.85,
              "wind_deg": 151,
              "wind_gust": 5.36,
              "weather": [
                  {
                      "id": 801,
                      "main": "Clouds",
                      "description": "few clouds",
                      "icon": "02d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731783600,
              "temp": 293.54,
              "feels_like": 292.91,
              "pressure": 1015,
              "humidity": 49,
              "dew_point": 282.69,
              "uvi": 4.12,
              "clouds": 8,
              "visibility": 10000,
              "wind_speed": 3.79,
              "wind_deg": 160,
              "wind_gust": 5.42,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731787200,
              "temp": 294.18,
              "feels_like": 293.59,
              "pressure": 1014,
              "humidity": 48,
              "dew_point": 282.84,
              "uvi": 3.12,
              "clouds": 9,
              "visibility": 10000,
              "wind_speed": 4.17,
              "wind_deg": 162,
              "wind_gust": 5.58,
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731790800,
              "temp": 294.1,
              "feels_like": 293.53,
              "pressure": 1013,
              "humidity": 49,
              "dew_point": 283.06,
              "uvi": 1.6,
              "clouds": 25,
              "visibility": 10000,
              "wind_speed": 4.37,
              "wind_deg": 164,
              "wind_gust": 6,
              "weather": [
                  {
                      "id": 802,
                      "main": "Clouds",
                      "description": "scattered clouds",
                      "icon": "03d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731794400,
              "temp": 293.06,
              "feels_like": 292.57,
              "pressure": 1013,
              "humidity": 56,
              "dew_point": 284.14,
              "uvi": 0.55,
              "clouds": 29,
              "visibility": 10000,
              "wind_speed": 3.45,
              "wind_deg": 162,
              "wind_gust": 6.56,
              "weather": [
                  {
                      "id": 802,
                      "main": "Clouds",
                      "description": "scattered clouds",
                      "icon": "03d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731798000,
              "temp": 290.11,
              "feels_like": 289.58,
              "pressure": 1013,
              "humidity": 66,
              "dew_point": 283.69,
              "uvi": 0,
              "clouds": 43,
              "visibility": 10000,
              "wind_speed": 2.56,
              "wind_deg": 151,
              "wind_gust": 2.83,
              "weather": [
                  {
                      "id": 802,
                      "main": "Clouds",
                      "description": "scattered clouds",
                      "icon": "03d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731801600,
              "temp": 289.28,
              "feels_like": 288.7,
              "pressure": 1014,
              "humidity": 67,
              "dew_point": 283.18,
              "uvi": 0,
              "clouds": 53,
              "visibility": 10000,
              "wind_speed": 2.8,
              "wind_deg": 143,
              "wind_gust": 3.16,
              "weather": [
                  {
                      "id": 803,
                      "main": "Clouds",
                      "description": "broken clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731805200,
              "temp": 288.77,
              "feels_like": 288.19,
              "pressure": 1014,
              "humidity": 69,
              "dew_point": 283.26,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 3.29,
              "wind_deg": 150,
              "wind_gust": 7.25,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731808800,
              "temp": 288.09,
              "feels_like": 287.57,
              "pressure": 1014,
              "humidity": 74,
              "dew_point": 283.51,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 3.16,
              "wind_deg": 149,
              "wind_gust": 8.42,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731812400,
              "temp": 287.64,
              "feels_like": 287.16,
              "pressure": 1014,
              "humidity": 77,
              "dew_point": 283.75,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 3.16,
              "wind_deg": 144,
              "wind_gust": 7.7,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731816000,
              "temp": 287.27,
              "feels_like": 286.83,
              "pressure": 1014,
              "humidity": 80,
              "dew_point": 283.88,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 3.14,
              "wind_deg": 144,
              "wind_gust": 8.04,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731819600,
              "temp": 286.91,
              "feels_like": 286.48,
              "pressure": 1014,
              "humidity": 82,
              "dew_point": 283.98,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.92,
              "wind_deg": 151,
              "wind_gust": 7.4,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731823200,
              "temp": 286.81,
              "feels_like": 286.45,
              "pressure": 1014,
              "humidity": 85,
              "dew_point": 284.3,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.95,
              "wind_deg": 143,
              "wind_gust": 7.21,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731826800,
              "temp": 286.86,
              "feels_like": 286.58,
              "pressure": 1014,
              "humidity": 88,
              "dew_point": 284.9,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 3.02,
              "wind_deg": 155,
              "wind_gust": 8.79,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731830400,
              "temp": 287.01,
              "feels_like": 286.83,
              "pressure": 1014,
              "humidity": 91,
              "dew_point": 285.59,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.86,
              "wind_deg": 146,
              "wind_gust": 7.78,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731834000,
              "temp": 286.95,
              "feels_like": 286.81,
              "pressure": 1013,
              "humidity": 93,
              "dew_point": 285.89,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.8,
              "wind_deg": 145,
              "wind_gust": 6.27,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731837600,
              "temp": 287,
              "feels_like": 286.9,
              "pressure": 1013,
              "humidity": 94,
              "dew_point": 286.03,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.72,
              "wind_deg": 145,
              "wind_gust": 5.23,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731841200,
              "temp": 287.09,
              "feels_like": 286.99,
              "pressure": 1014,
              "humidity": 94,
              "dew_point": 286.2,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.85,
              "wind_deg": 157,
              "wind_gust": 7.03,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731844800,
              "temp": 287.09,
              "feels_like": 287.02,
              "pressure": 1014,
              "humidity": 95,
              "dew_point": 286.28,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.8,
              "wind_deg": 157,
              "wind_gust": 7.39,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731848400,
              "temp": 287.14,
              "feels_like": 287.08,
              "pressure": 1014,
              "humidity": 95,
              "dew_point": 286.46,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.86,
              "wind_deg": 149,
              "wind_gust": 7.23,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731852000,
              "temp": 289.05,
              "feels_like": 289.05,
              "pressure": 1015,
              "humidity": 90,
              "dew_point": 287.42,
              "uvi": 0.26,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 2.97,
              "wind_deg": 150,
              "wind_gust": 8.68,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731855600,
              "temp": 290.37,
              "feels_like": 290.39,
              "pressure": 1015,
              "humidity": 86,
              "dew_point": 288.14,
              "uvi": 0.96,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 2.97,
              "wind_deg": 149,
              "wind_gust": 9.2,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731859200,
              "temp": 290.86,
              "feels_like": 290.98,
              "pressure": 1015,
              "humidity": 88,
              "dew_point": 288.85,
              "uvi": 1.07,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.52,
              "wind_deg": 135,
              "wind_gust": 7.76,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "pop": 0
          },
          {
              "dt": 1731862800,
              "temp": 291.59,
              "feels_like": 291.81,
              "pressure": 1015,
              "humidity": 89,
              "dew_point": 289.78,
              "uvi": 0.82,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 2.75,
              "wind_deg": 143,
              "wind_gust": 7.73,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 0.26,
              "rain": {
                  "1h": 0.37
              }
          },
          {
              "dt": 1731866400,
              "temp": 294.21,
              "feels_like": 294.46,
              "pressure": 1014,
              "humidity": 80,
              "dew_point": 290.71,
              "uvi": 1.6,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.21,
              "wind_deg": 147,
              "wind_gust": 7.78,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 0.45,
              "rain": {
                  "1h": 0.19
              }
          },
          {
              "dt": 1731870000,
              "temp": 295.65,
              "feels_like": 295.99,
              "pressure": 1013,
              "humidity": 78,
              "dew_point": 291.76,
              "uvi": 1.52,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.98,
              "wind_deg": 155,
              "wind_gust": 7.48,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 0.87,
              "rain": {
                  "1h": 0.2
              }
          },
          {
              "dt": 1731873600,
              "temp": 294.46,
              "feels_like": 294.87,
              "pressure": 1012,
              "humidity": 85,
              "dew_point": 291.89,
              "uvi": 1.38,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 4.27,
              "wind_deg": 153,
              "wind_gust": 7.33,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 0.96,
              "rain": {
                  "1h": 0.34
              }
          },
          {
              "dt": 1731877200,
              "temp": 294.2,
              "feels_like": 294.66,
              "pressure": 1012,
              "humidity": 88,
              "dew_point": 292.23,
              "uvi": 1.12,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 3.43,
              "wind_deg": 133,
              "wind_gust": 7.88,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "pop": 0.86
          },
          {
              "dt": 1731880800,
              "temp": 293.64,
              "feels_like": 294.15,
              "pressure": 1012,
              "humidity": 92,
              "dew_point": 292.27,
              "uvi": 0.44,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 3.26,
              "wind_deg": 141,
              "wind_gust": 8.3,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.6
              }
          },
          {
              "dt": 1731884400,
              "temp": 292.79,
              "feels_like": 293.29,
              "pressure": 1012,
              "humidity": 95,
              "dew_point": 292.05,
              "uvi": 0,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 3.01,
              "wind_deg": 135,
              "wind_gust": 8.82,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10d"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.51
              }
          },
          {
              "dt": 1731888000,
              "temp": 292.76,
              "feels_like": 293.26,
              "pressure": 1012,
              "humidity": 95,
              "dew_point": 292,
              "uvi": 0,
              "clouds": 99,
              "visibility": 10000,
              "wind_speed": 3.75,
              "wind_deg": 126,
              "wind_gust": 10.44,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10n"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.18
              }
          },
          {
              "dt": 1731891600,
              "temp": 292.81,
              "feels_like": 293.31,
              "pressure": 1012,
              "humidity": 95,
              "dew_point": 291.95,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.18,
              "wind_deg": 135,
              "wind_gust": 11.28,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10n"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.36
              }
          },
          {
              "dt": 1731895200,
              "temp": 292.79,
              "feels_like": 293.26,
              "pressure": 1012,
              "humidity": 94,
              "dew_point": 291.83,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.4,
              "wind_deg": 140,
              "wind_gust": 12.25,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10n"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.37
              }
          },
          {
              "dt": 1731898800,
              "temp": 292.54,
              "feels_like": 293.02,
              "pressure": 1012,
              "humidity": 95,
              "dew_point": 291.72,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.45,
              "wind_deg": 141,
              "wind_gust": 13.11,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10n"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.51
              }
          },
          {
              "dt": 1731902400,
              "temp": 292.61,
              "feels_like": 293.07,
              "pressure": 1011,
              "humidity": 94,
              "dew_point": 291.74,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 4.88,
              "wind_deg": 146,
              "wind_gust": 14.03,
              "weather": [
                  {
                      "id": 500,
                      "main": "Rain",
                      "description": "light rain",
                      "icon": "10n"
                  }
              ],
              "pop": 1,
              "rain": {
                  "1h": 0.13
              }
          },
          {
              "dt": 1731906000,
              "temp": 293.07,
              "feels_like": 293.52,
              "pressure": 1011,
              "humidity": 92,
              "dew_point": 291.73,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 5.01,
              "wind_deg": 151,
              "wind_gust": 14.33,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0.8
          },
          {
              "dt": 1731909600,
              "temp": 293.11,
              "feels_like": 293.51,
              "pressure": 1010,
              "humidity": 90,
              "dew_point": 291.4,
              "uvi": 0,
              "clouds": 100,
              "visibility": 10000,
              "wind_speed": 6.06,
              "wind_deg": 152,
              "wind_gust": 15.4,
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04n"
                  }
              ],
              "pop": 0.8
          }
      ]
  };

    let news;
    try {
      news = await OpenAI.generateForecast(forecast, type, language);
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    return { news };
  }

  async generateNews(address: string) {
    let location;
    try {
      location = await GoogleMap.getLocationByAddress(address);
    } catch (e: any) {
      throw this.createError('GoogleMapGetLocationByAddressFailed', 'Failed to get location.', 400, e);
    }

    let forecast;
    try {
      forecast = await Forecast.getByLocation(location.lat, location.lng);
    } catch (e: any) {
      throw this.createError('ForecastGetByLocationFailed', 'Failed to call forecast getByLocation.', 400, e);
    }

    let skFactual;
    try {
      skFactual = await OpenAI.generateForecast(forecast, 'factual', 'sk');
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    let enFactual;
    try {
      enFactual = await OpenAI.generateForecast(forecast, 'factual', 'en');
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    let skTabloid;
    try {
      skTabloid = await OpenAI.generateForecast(forecast, 'tabloid', 'sk');
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    let enTabloid;
    try {
      enTabloid = await OpenAI.generateForecast(forecast, 'tabloid', 'en');
    } catch (e: any) {
      throw this.createError('OpenAIGenerateForecastFailed', 'Failed to call forecast getByAddress.', 400, e);
    }

    const mongoObj: Create = {
      factual: {
        sk: skFactual,
        en: enFactual
      },
      tabloid: {
        sk: skTabloid,
        en: enTabloid
      },
      date: new Date(),
      location: address
    };

    try {
      await ForecastDB.create(mongoObj);
    } catch (e: any) {
      throw this.createError('ForecastDBCreateFailed', 'Failed to call forecastDB create.', 400, e);
    }

  }
}

export default new WeatherService('WeatherService');
