import {$http} from '../api/apiServices';

/**
 *
 * @param token
 */
const setAuthorizationToken = (token: string) => {
  console.log('token in the setAuthorizationToken', token);
  if (token) {
    $http.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

export {setAuthorizationToken};
