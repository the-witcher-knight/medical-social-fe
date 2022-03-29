import { StorageAPI } from './storage-util';

/**
 * read date from token
 * @param {string} token string token
 * @returns {object}
 */
export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

/**
 * extract user data from jwt token.
 * @returns {sub: string, auth: string, exp: number}
 */
export const getUserAuthentication = () => {
  const token = StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken');
  return parseJwt(token);
};
