const { Post } = require('../models');
const { populate } = require('../models/tag.model');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const populate = [{
    path: 'tags',
    select: 'title slug'
  }, {
    path: 'category'
  }];
  const p = q => {
    console.log(typeof q);
    return q.populate(populate);
  };
  const posts = await Post.paginate(filter, options, p);
  return posts;
};

module.exports = {
  queryPosts
};
