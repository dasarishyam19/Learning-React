import React from 'react';
import './Typography.css';

/**
 * Typography Atom Components
 * Demonstrates a polymorphic component via the `as` prop
 */
export const Typography = ({
    as: Component = 'p',
    children,
    variant = 'body',
    color = 'default',
    className = '',
    ...props
}) => {
    const baseClasses = `typography typography-${variant} color-${color}`;

    return (
        <Component className={`${baseClasses} ${className}`.trim()} {...props}>
            {children}
        </Component>
    );
};
