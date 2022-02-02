const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const recordService = require('../services/record.service');

const getRecords = catchAsync(async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.query;
  if (!startDate || !endDate || !minCount || !maxCount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required query parameters.');
  }
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
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = 100;
  const result = await recordService.queryRecords(filter, options);
  const { paginatedResults } = result;
  const records = paginatedResults.map((r) => {
    // eslint-disable-next-line no-param-reassign
    delete r._id;
    return r;
  });
  const response = { code: httpStatus.OK, msg: 'Success', records };
  res.send(response);
});

module.exports = {
  getRecords,
};
