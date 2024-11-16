import MongoClass from '#lib/mongo-class';
import { ObjectId } from 'mongodb';

class ForecastDB extends MongoClass {
  async create(forecast: Record<string, unknown>) {
    await this.col.insertOne({ _id: new ObjectId(), ...forecast });
  }
}

export default new ForecastDB('forecast');
