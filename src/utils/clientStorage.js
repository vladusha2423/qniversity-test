export const setItemsToStorage = items => {
  const itemsKeys = Object.keys(items);
  itemsKeys.map(item => {
    localStorage.setItem(item, JSON.stringify(items[item]));
  });
};

export const getItemFromStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return '';
  }
};

export const setItemToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromStorage = key => localStorage.removeItem(key);

export const removeItemsFromStorage = items => Object.keys(items).map(item => localStorage.removeItem(item));
