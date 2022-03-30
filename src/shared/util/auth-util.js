import { StorageAPI } from './storage-util';
import { AuthorityConstant } from 'src/shared/authority-constant';

/**
 * read date from token
 * @param {string} token string token
 * @returns {object}
 */
export function parseJwt(token) {
  if (token === null || token === undefined) {
    return null;
  }
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

/**
 * is user has doctor role
 * @param {sub: string, auth: string, exp: number} user
 * @returns {boolean} user is doctor or not
 */
export const isDoctor = user => {
  if (user === null || user === undefined) {
    return false;
  }
  return user.auth === AuthorityConstant.DOCTOR;
};

export const isAdmin = user => {
  if (user === null || user === undefined) {
    return false;
  }
  return user.auth === AuthorityConstant.ADMIN;
};

export const isUser = user => {
  if (user === null || user === undefined) {
    return false;
  }
  return user.auth === AuthorityConstant.USER;
};

export const isPharmacy = user => {
  if (user === null || user === undefined) {
    return false;
  }
  return user.auth === AuthorityConstant.PHARMACY;
};
