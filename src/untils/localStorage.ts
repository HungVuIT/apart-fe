const accessToken = 'access_token_watchshop';
const refreshToken = 'refresh_token_watchshop';
const getLocalStorage = (nameItem: string) => {
  return localStorage.getItem(nameItem);
};

const setLocalStorage = (nameItem: string, value: string) => {
  localStorage.setItem(nameItem, value);
};

const removeLocalStorage = (nameItem: string) => {
  return localStorage.removeItem(nameItem);
};

const getAccessToken = () => {
  return getLocalStorage(accessToken);
};

const setAccessToken = (value: string) => {
  return setLocalStorage(accessToken, value);
};

const removeAccessToken = () => {
  return removeLocalStorage(accessToken);
};
const getRefreshToken = () => {
  return getLocalStorage(refreshToken);
};

const setRefreshToken = (value: string) => {
  return setLocalStorage(refreshToken, value);
};

const removeRefreshToken = () => {
  return removeLocalStorage(refreshToken);
};

export {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
};
