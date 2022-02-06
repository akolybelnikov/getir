const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const recordService = require('../services/record.service');

const getRecords = catchAsync(async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.query;
  if (!startDate || !endDate || !minCount || !maxCount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required query parameters.');
  }
  const result = await recordService.queryRecords({ startDate, endDate, minCount, maxCount });
  const records = result.map((r) => ({ createdAt: r.createdAt, key: r.key, totalCount: r.totalCount }));
  const response = { code: httpStatus.OK, msg: 'Success', records };
  res.send(response);
});

module.exports = {
  getRecords,
};
