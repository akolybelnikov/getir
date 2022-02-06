const { Record } = require('../models');

/**
 * Query for records
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryRecords = async ({ startDate, endDate, minCount, maxCount }) => {
  const filter = {
    project: {
      createdAt: '$createdAt',
      key: '$key',
      totalCount: { $sum: '$counts' },
    },
    match: {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      totalCount: { $gte: parseInt(minCount, 10), $lte: parseInt(maxCount, 10) },
    },
  };
  return Record.queryByCounts(filter);
};

module.exports = {
  queryRecords,
};
