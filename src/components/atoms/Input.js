import React, { forwardRef } from 'react';
import './Input.css';

/**
 * Input Atom Component
 * Uses forwardRef to ensure parents can access the raw input element.
 */
export const Input = forwardRef(({
    type = 'text',
    placeholder = '',
    className = '',
    disabled = false,
    hasError = false,
    ...props
}, ref) => {
    const errorClass = hasError ? 'input-error' : '';

    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`input-field ${errorClass} ${className}`.trim()}
            {...props}
        />
    );
});

Input.displayName = 'Input';
