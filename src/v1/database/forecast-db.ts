import MongoClass from '#lib/mongo-class';
import { ObjectId } from 'mongodb';

import { Forecast } from '#v1-dbInterfaces/forecast';

class ForecastDB extends MongoClass {
  async create(forecast: Record<string, unknown>) {
    await this.col.insertOne({ _id: new ObjectId(), ...forecast });
  }

  async getByInterval(from: Date, to: Date, location: string) {
    return this.col.findOne<Forecast>({ date: { $gte: from, $lte: to }, location });
  }
}

export default new ForecastDB('forecast');
