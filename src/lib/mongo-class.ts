import MongoDB from '#lib/mongo-db';

class MongoClass {
  constructor(private collectionName: string) {}

  protected get col() {
    return MongoDB.db.collection(this.collectionName);
  }
}

export default MongoClass;
