export const getLocalStorageItem = (key: string) =>
  window?.localStorage?.getItem(key);

export const storeLocalStorageItem = (key: string, value: any) =>
  window?.localStorage?.setItem(key, value);

export const removeLocalStorageItem = (key: string) =>
  window?.localStorage?.removeItem(key);
