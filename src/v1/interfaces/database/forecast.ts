export interface Forecast {
  _id: string;
  date: Date;
  location: string;
  forecastData: Record<string, unknown>;
  factual: {
    sk: string;
    en: string;
  };
  tabloid: {
    sk: string;
    en: string;
  };
}

export type Create = Omit<Forecast, '_id'>;
