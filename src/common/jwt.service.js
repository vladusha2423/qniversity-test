import { getItemFromStorage, removeItemFromStorage, setItemToStorage } from '../utils/clientStorage';

const ID_TOKEN_KEY = 'id_token';

export const getToken = () => {
  return getItemFromStorage(ID_TOKEN_KEY);
};

export const saveToken = token => {
  setItemToStorage(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  removeItemFromStorage(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
