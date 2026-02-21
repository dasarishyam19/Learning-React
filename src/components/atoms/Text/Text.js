import React, { forwardRef } from 'react';
import styles from './Text.module.css';

const Text = forwardRef(({
    as: Component = 'p',
    variant = 'body',
    weight = 'normal',
    align = 'left',
    color = 'default',
    className = '',
    children,
    ...rest
}, ref) => {
    const classes = [
        styles.text,
        styles[variant],
        styles[`weight-${weight}`],
        styles[`align-${align}`],
        styles[`color-${color}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <Component ref={ref} className={classes} {...rest}>
            {children}
        </Component>
    );
});

Text.displayName = 'Text';

export default Text;
