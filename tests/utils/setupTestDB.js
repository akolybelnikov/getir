const mongoose = require('mongoose');
const fileSystem = require('fs');
const config = require('../../src/config/config');

const setupTestDB = () => {
  beforeAll(async () => {
    config.env = 'test';
    try {
      const db = await mongoose.connect(config.mongoose.url, config.mongoose.options);
      const data = fileSystem.readFileSync('./records.json', 'utf8');
      const documents = JSON.parse(data);
      await db.collection('records').insertMany(documents);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.reason, config.mongoose.url);
    }
  });

  afterAll(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        // eslint-disable-next-line no-console
        collection.deleteMany({}, (c) => console.log(`Deleted ${c.name}`))
      )
    );
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
