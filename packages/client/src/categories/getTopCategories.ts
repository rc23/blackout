import client, { adaptError } from '../helpers/client';
import type { GetCategories } from './types';

/**
 * Method responsible for getting the top categories.
 *
 * @memberof module:categories/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getTopCategories: GetCategories = config =>
  client
    .get('/commerce/v1/categories/top', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getTopCategories;