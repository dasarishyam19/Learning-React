import React, { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...rest
}, ref) => {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        className
    ].filter(Boolean).join(' ');

    return (
        <button ref={ref} className={classes} {...rest}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
