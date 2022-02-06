/* eslint-disable no-param-reassign */

const queryByCounts = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Record[]} records - Results found
   */
  /**
   * Query for documents with filter
   * @param {Object} [filter] - Mongo filter
   * @returns {Promise<{records: Record[]}>}
   */
  schema.statics.queryByCounts = async function (filter) {
    return this.aggregate().project(filter.project).match(filter.match).exec();
  };
};

module.exports = queryByCounts;
