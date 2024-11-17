import { MongoClient, Db } from 'mongodb';
import config from 'config';

const connectionUrl = config.get<string>('mongodb.connection-string');

class MongoDB {
  private _client: MongoClient;
  private _dbName: string;
  private _db: Db | undefined;
  constructor() {
    this._client = new MongoClient(connectionUrl);
    this._dbName = 'weather-app';
  }

  private get client() {
    return this._client;
  }

  private get dbName() {
    return this._dbName;
  }

  get db() {
    if (!this._db) {
      throw new Error('DB is not initialized!');
    }

    return this._db!;
  }

  private set db(database: Db) {
    this._db = database;
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.createIndex();
  }

  private async createIndex() {
    await this.db.collection('forecast').createIndex({ date: 1, location: 1 });
  }
}

export default new MongoDB();
