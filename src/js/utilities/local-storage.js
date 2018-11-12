export const saveToLocalStorage = ({ key, value }) => {
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (e) {
    // Silently fail
  }
};

export const fetchFromLocalStorage = key => {
  try {
    const record = JSON.parse(localStorage.getItem(key));

    if (record) {
      return record;
    }
  } catch (e) {
    return false;
  }
};
