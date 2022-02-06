const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Record } = require('../../src/models');

let server;

/**
 *
 * @returns {Promise<void>}
 */
const start = async () => {
  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'getir-test',
  };
  server = await MongoMemoryServer.create();
  await mongoose.connect(server.getUri(), mongooseOpts);
};

/**
 *
 * @returns {Promise<void>}
 */
const cleanup = async () => {
  const { collections } = mongoose.connection;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany(null, null);
  }
};

/**
 *
 * @returns {Promise<void>}
 */
const stop = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await server.stop();
};

module.exports = {
  start,
  stop,
  cleanup,
};
