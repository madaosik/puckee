import React, { useState, useEffect } from 'react'

export const API_BASE = 'http://127.0.0.1:5000/api'
export const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  },
  timeout: 2000
}

export * from './game'
export * from './athlete'
export * from './icerink'

// Hook
export function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

