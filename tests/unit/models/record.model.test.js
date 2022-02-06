const DBTestHelper = require('../../utils/db.test.helper');
const { queryRecords } = require('../../../src/services/record.service');
const { insertRecords } = require('../../fixtures/records.fixture');

beforeAll(async () => {
  await DBTestHelper.start();
});

afterAll(async () => {
  await DBTestHelper.stop();
});

afterEach(async () => {
  await DBTestHelper.cleanup();
});

describe('query by counts', () => {
  test('should return 0 documents', async () => {
    const query = {
      startDate: '01.01.1999',
      endDate: '01.01.1999',
      minCount: 20000,
      maxCount: 0,
    };
    const { startDate, endDate, minCount, maxCount } = query;
    const result = await queryRecords({ startDate, endDate, minCount, maxCount });
    expect(result).toHaveLength(0);
  });

  test('should return 3 filtered documents', async () => {
    await insertRecords();
    const query = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 100,
      maxCount: 500,
    };
    const { startDate, endDate, minCount, maxCount } = query;
    const result = await queryRecords({ startDate, endDate, minCount, maxCount });
    expect(result).toHaveLength(3);
  });

  test('should return 5 filtered documents', async () => {
    await insertRecords();
    const query = {
      startDate: '2015-01-01',
      endDate: '2018-02-02',
      minCount: 0,
      maxCount: 5000,
    };
    const { startDate, endDate, minCount, maxCount } = query;
    const result = await queryRecords({ startDate, endDate, minCount, maxCount });
    expect(result).toHaveLength(5);
  });
});
