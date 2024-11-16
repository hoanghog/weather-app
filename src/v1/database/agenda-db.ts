import MongoClass from '#lib/mongo-class';
import { ObjectId } from 'mongodb';

class AgendaDB extends MongoClass {
  async create(agendaJob: any) {
    await this.col.insertOne({ _id: new ObjectId(), ...agendaJob });
  }
}

export default new AgendaDB('agendaFail');
