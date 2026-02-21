import React from 'react';
import styles from './Card.module.css';

export function Card({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.card} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.header} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};

Card.Body = function CardBody({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.body} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.footer} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};
