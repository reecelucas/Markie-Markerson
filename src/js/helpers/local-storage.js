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
    const value = JSON.parse(localStorage.getItem(key));

    if (value) {
      return value;
    }
  } catch (e) {
    return false;
  }
};
