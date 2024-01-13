import { useState } from "react";

type ValueSetter<T> = T | ((value: T) => T);

/**
 * Custom hook for persisting state in localStorage.
 * Validates key, handles storage unavailability, and uses lazy initialization for useState.
 *
 * @param {string} key - Storage key.
 * @param {T} initialValue - Initial value for the state.
 * @param {boolean} [useLocalStorage=true] - Flag to enable or disable using localStorage.
 * @returns {[T, (value: ValueSetter<T>) => void]} - Stateful value and a function to update it.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  useLocalStorage = true
): [T, (value: ValueSetter<T>) => void] {
  if (typeof key !== "string") {
    throw new Error("The 'key' parameter must be a string.");
  }

  const storageAvailable = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (useLocalStorage && storageAvailable) {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading localStorage:", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value: ValueSetter<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (useLocalStorage && storageAvailable) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Custom hook for persisting state in sessionStorage.
 * Similar to useLocalStorage but uses sessionStorage.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  useSessionStorage = true
): [T, (value: ValueSetter<T>) => void] {
  if (typeof key !== "string") {
    throw new Error("The 'key' parameter must be a string.");
  }

  const storageAvailable = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (useSessionStorage && storageAvailable) {
      try {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading sessionStorage:", error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value: ValueSetter<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (useSessionStorage && storageAvailable) {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing to sessionStorage:", error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Function to clear specified keys from localStorage and sessionStorage.
 *
 * @param {string[]} keys - Array of keys to be cleared.
 */
export function clearStorageByKeys(keys: string[]): void {
  if (typeof window !== "undefined") {
    keys.forEach((key) => {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    });
  }
}
