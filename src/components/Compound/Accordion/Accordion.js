import React, { createContext, useContext, useState, useId } from 'react';
import styles from './Accordion.module.css';

const AccordionContext = createContext(null);

export function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('Accordion components must be rendered within an <Accordion>');
    }
    return context;
}

export function Accordion({ children, allowMultiple = false, className = '' }) {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (id) => {
        setOpenItems((prev) => {
            const newItems = new Set(prev);
            if (newItems.has(id)) {
                newItems.delete(id);
            } else {
                if (!allowMultiple) {
                    newItems.clear();
                }
                newItems.add(id);
            }
            return newItems;
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className={`${styles.accordion} ${className}`.trim()}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

const AccordionItemContext = createContext(null);

export function useAccordionItem() {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error('AccordionItem components must be rendered within an <Accordion.Item>');
    }
    return context;
}

Accordion.Item = function AccordionItem({ children, className = '', id: providedId, ...rest }) {
    const generatedId = useId();
    const id = providedId || generatedId;
    const { openItems, toggleItem } = useAccordion();
    const isOpen = openItems.has(id);

    return (
        <AccordionItemContext.Provider value={{ id, isOpen, toggleItem }}>
            <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''} ${className}`.trim()} {...rest}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
};

Accordion.Header = function AccordionHeader({ children, className = '', ...rest }) {
    const { id, isOpen, toggleItem } = useAccordionItem();

    return (
        <button
            type="button"
            className={`${styles.header} ${className}`.trim()}
            onClick={() => toggleItem(id)}
            aria-expanded={isOpen}
            aria-controls={`accordion-panel-${id}`}
            id={`accordion-header-${id}`}
            {...rest}
        >
            <span className={styles.headerContent}>{children}</span>
            <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </button>
    );
};

Accordion.Panel = function AccordionPanel({ children, className = '', ...rest }) {
    const { id, isOpen } = useAccordionItem();

    if (!isOpen) return null;

    return (
        <div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-header-${id}`}
            className={`${styles.panel} ${className}`.trim()}
            {...rest}
        >
            <div className={styles.panelContent}>
                {children}
            </div>
        </div>
    );
};
