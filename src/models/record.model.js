const mongoose = require('mongoose');
const { paginate } = require('./plugins');

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
recordSchema.plugin(paginate);

/**
 * @typedef Record
 */
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
