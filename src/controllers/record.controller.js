const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const recordService = require('../services/record.service');
const logger = require('../config/logger');

const getRecords = catchAsync(async (req, res) => {
  try {
    const result = await recordService.queryRecords(req.query);
    const records = result.map((r) => ({ createdAt: r.createdAt, key: r.key, totalCount: r.totalCount }));
    const response = { code: httpStatus.OK, msg: 'Success', records };
    res.send(response);
  } catch (e) {
    logger.debug(e);
    res.send(e);
  }
});

module.exports = {
  getRecords,
};
