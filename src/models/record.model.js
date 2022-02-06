const mongoose = require('mongoose');
const { queryByCounts } = require('./plugins');

const recordSchema = mongoose.Schema(
  {
    createdAt: {
      type: Date,
      required: true,
    },
    key: {
      type: String,
      required: true,
      trim: true,
    },
    counts: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that paginates query results
recordSchema.plugin(queryByCounts);

/**
 * @typedef Record
 */
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
