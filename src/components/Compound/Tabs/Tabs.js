import React, { createContext, useContext, useState } from 'react';
import styles from './Tabs.module.css';

const TabsContext = createContext(null);

export function useTabs() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound components must be rendered within a <Tabs>');
    }
    return context;
}

export function Tabs({ children, defaultIndex = 0, className = '' }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
            <div className={`${styles.tabs} ${className}`.trim()}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

Tabs.List = function TabsList({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.tabList} ${className}`.trim()} role="tablist" {...rest}>
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child;
                return React.cloneElement(child, { index });
            })}
        </div>
    );
};

Tabs.Tab = function Tab({ children, index, className = '', ...rest }) {
    const { activeIndex, setActiveIndex } = useTabs();
    const isActive = activeIndex === index;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.activeTab : ''} ${className}`.trim()}
            onClick={() => setActiveIndex(index)}
            {...rest}
        >
            {children}
        </button>
    );
};

Tabs.Panels = function TabsPanels({ children, className = '', ...rest }) {
    return (
        <div className={`${styles.tabPanels} ${className}`.trim()} {...rest}>
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child;
                return React.cloneElement(child, { index });
            })}
        </div>
    );
};

Tabs.Panel = function TabPanel({ children, index, className = '', ...rest }) {
    const { activeIndex } = useTabs();
    if (activeIndex !== index) return null;

    return (
        <div role="tabpanel" className={`${styles.tabPanel} ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};
