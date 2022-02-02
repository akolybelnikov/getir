/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.limit] - Maximum number of results per page (default = 10)
   * @param {string} [options.page] - Current page (default = 1)
   * @returns {Promise<{totalResults: unknown, limit: (number|number), totalPages: number, page: (number|number)}>}
   */
  schema.statics.paginate = async function (filter, options) {
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.aggregate()
      .project(filter.project)
      .match(filter.match)
      .facet({
        paginatedResults: [{ $skip: skip }, { $limit: limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      })
      .exec();

    return Promise.all([countPromise]).then((values) => {
      const { paginatedResults, totalCount } = values.flat(2)[0];
      const { count } = totalCount[0];
      const totalPages = Math.ceil(count / limit);
      const result = {
        page,
        limit,
        totalPages,
        paginatedResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
