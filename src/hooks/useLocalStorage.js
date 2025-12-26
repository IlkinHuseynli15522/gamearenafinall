// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initial) {
  const read = () => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  };

  const [state, setState] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [key, state]);

  return [state, setState];
}
