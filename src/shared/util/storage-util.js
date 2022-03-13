/* eslint-disable no-undef */
/**
 * Get either localStorage or sessionStorage
 * @param type storage type
 */
export const getStorage = type => {
  if (type === 'SESSION') {
    return window.sessionStorage;
  }
  return window.localStorage;
};

/**
 * Set an item into storage
 * @param type storage type
 * @param key key to set
 * @param value value to set
 */
const setItem = type => (key, value) => {
  getStorage(type).setItem(key, JSON.stringify(value));
};

/**
 * Get an item from storage
 * @param type storage type
 * @param key key to get
 * @param defaultVal value to return if key doesnt exist
 */
const getItem = type => (key, defaultVal) => {
  const val = getStorage(type).getItem(key);
  if (!val || val === 'undefined') return defaultVal;
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

/**
 * Remove item from storage
 * @param type storage type
 * @param key key to remove
 */
const removeItem = type => key => {
  getStorage(type).removeItem(key);
};

// export type getItemType = (key: string, defaultVal?: any) => any;
// export type setItemType = (key: string, value: any) => void;
// export type removeItemType = (key: string) => void;

// export interface IStorageAPI {
//   get: getItemType;
//   set: setItemType;
//   remove: removeItemType;
// }

// export interface IStorageService {
//   session: IStorageAPI;
//   local: IStorageAPI;
// }

export const StorageAPI = {
  session: {
    get: getItem('SESSION'),
    set: setItem('SESSION'),
    remove: removeItem('SESSION'),
  },
  local: {
    get: getItem('LOCAL'),
    set: setItem('LOCAL'),
    remove: removeItem('LOCAL'),
  },
};
