const accessToken = 'watchshop_token';

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

export { getAccessToken, setAccessToken, removeAccessToken };
