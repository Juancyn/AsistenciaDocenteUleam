// src/components/utils/storage.js
export const getItem = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addItem = (key, item) => {
  const data = getItem(key);
  data.push(item);
  setItem(key, data);
};

export const removeItem = (key, index) => {
  const data = getItem(key);
  data.splice(index, 1);
  setItem(key, data);
};

export const updateItem = (key, index, newItem) => {
  const data = getItem(key);
  data[index] = newItem;
  setItem(key, data);
};
