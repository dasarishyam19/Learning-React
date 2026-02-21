import React from 'react';
import './Button.css';

/**
 * Button Atom Component
 * Highly reusable with variants, sizes, and polymorphic behaviors if needed.
 */
export const Button = ({
    children,
    onClick,
    variant = 'default',
    size = 'md',
    type = 'button',
    className = '',
    disabled = false,
    ...props
}) => {
    const baseClasses = `btn btn-${variant} btn-${size}`;

    return (
        <button
            type={type}
            className={`${baseClasses} ${className}`.trim()}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
