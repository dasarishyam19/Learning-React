import { useState, useCallback } from 'react';

/**
 * useToggle Hook
 * Standardizes boolean toggling logic.
 *
 * @param {boolean} initialValue
 * @returns {[boolean, function, function, function]} [value, toggle, setTrue, setFalse]
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue((prev) => !prev), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return [value, toggle, setTrue, setFalse];
};
