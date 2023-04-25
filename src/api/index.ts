import wretch from 'wretch';

import { API_PATH } from '../routes';

const api = wretch(API_PATH)
  .errorType('json')
  .resolve((response) => response.json((json) => json));

export default api;
