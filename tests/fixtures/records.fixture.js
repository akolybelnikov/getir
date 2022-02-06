const Record = require('../../src/models/record.model');

const record1 = {
  key: 'TAKwGc6Jr4i8Z487',
  createdAt: '2017-01-28T01:22:14.398+0000',
  counts: [150, 160],
  value: 'Getir Task',
};

const record2 = {
  key: 'TAKwGc6Jr4i8Z487',
  createdAt: '2017-01-28T01:22:14.398+0000',
  counts: [170],
  value: 'Getir Task',
};

const record3 = {
  key: 'TAKwGc6Jr4i8Z487',
  createdAt: '2017-01-28T01:22:14.398+0000',
  counts: [120],
  value: 'Getir Task',
};

const record4 = {
  key: 'BqOIkrTF',
  createdAt: '2015-06-03T01:01:52.237+0000',
  counts: [1401, 1950, 1283],
  value: 'vHpHAzrmkwtt',
};

const record5 = {
  key: 'AkcKkrLs',
  value: 'qnfSodsuvVzc',
  createdAt: '2015-03-08T07:29:46.532+0000',
  counts: [1964, 1870, 1011],
};

const insertRecords = async () => {
  const result = await Record.insertMany([record1, record2, record3, record4, record5]);
  return result;
};

module.exports = {
  record1,
  record2,
  record3,
  record4,
  record5,
  insertRecords,
};
