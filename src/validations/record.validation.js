const Joi = require('joi');

const getRecords = {
  query: Joi.object().keys({
    startDate: Joi.string(),
    endDate: Joi.string(),
    minCount: Joi.number().integer(),
    maxCount: Joi.number().integer(),
  }),
};

module.exports = {
  getRecords,
};
