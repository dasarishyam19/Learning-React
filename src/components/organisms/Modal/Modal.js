import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

export function Modal({ isOpen, onClose, children, className = '' }) {
    const modalRef = useRef(null);
    useOnClickOutside(modalRef, onClose);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay}>
            <div
                ref={modalRef}
                className={`${styles.modal} ${className}`.trim()}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

Modal.Header = function ModalHeader({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.header} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};

Modal.Body = function ModalBody({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.body} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};

Modal.Footer = function ModalFooter({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.footer} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};
