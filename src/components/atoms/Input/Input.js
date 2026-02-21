import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
    className = '',
    hasError = false,
    ...rest
}, ref) => {
    const classes = [
        styles.input,
        hasError && styles.error,
        className
    ].filter(Boolean).join(' ');

    return (
        <input ref={ref} className={classes} {...rest} />
    );
});

Input.displayName = 'Input';

export default Input;
