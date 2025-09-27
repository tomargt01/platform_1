import React, {
    useState,
    useEffect,
    useRef,
    KeyboardEvent,
    ReactNode,
    FC,
} from 'react';
import {
    TabsProps,
    TabItem,
    TabOrientation,
    TabShape,
    TabSize,
} from './Tabs.types';
import {
    getTabClasses,
    getTabsContainerClasses,
    getPanelClasses,
    getBadgeClasses,
    getCloseButtonClasses,
} from './Tabs.styles';
import { getNextEnabledTab } from './utilities';

interface TabsState {
    activeTabId: string;
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTabId,
    onTabChange,
    onTabClose,
    shape = 'rounded',
    orientation = 'horizontal',
    size = 'md',
    theme = 'light',
    scrollable = false,
    draggable = false,
    nestedTabs = false,
    customSlotStart,
    customSlotEnd,
    animated = true,
    loadingTabs = [],
    lazyLoad = true,
    sticky = false,
    multiRow = false,
    sidebar = false,
    keyboardNav = true,
    routing = false, // Not implemented, hook extension for routing optional
    className,
    style,
}) => {
    const [localActiveTabId, setLocalActiveTabId] = useState(activeTabId);
    const [loadedTabs, setLoadedTabs] = useState<string[]>([activeTabId]);
    const [keyboardFocus, setKeyboardFocus] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalActiveTabId(activeTabId);
        if (!loadedTabs.includes(activeTabId)) {
            setLoadedTabs((prev) => [...prev, activeTabId]);
        }
    }, [activeTabId]);

    // Manage focus visibility: true if last input was keyboard, false if mouse
    useEffect(() => {
        const handleKeyDown = () => setKeyboardFocus(true);
        const handleMouseDown = () => setKeyboardFocus(false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleTabChange = (id: string) => {
        if (tabs.find((t) => t.id === id)?.disabled) return;
        setLocalActiveTabId(id);
        onTabChange(id);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!keyboardNav) return;
        const currentIndex = tabs.findIndex((t) => t.id === localActiveTabId);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        if (
            (orientation === 'horizontal' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) ||
            (orientation === 'vertical' && (e.key === 'ArrowUp' || e.key === 'ArrowDown'))
        ) {
            e.preventDefault();
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextIndex = getNextEnabledTab(tabs, currentIndex, 1);
            } else {
                nextIndex = getNextEnabledTab(tabs, currentIndex, -1);
            }
            handleTabChange(tabs[nextIndex].id);
            const el = containerRef.current?.querySelector<HTMLButtonElement>(
                `[data-tabid="${tabs[nextIndex].id}"]`
            );
            el?.focus();
        }
    };

    const handleCloseClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (onTabClose) onTabClose(id);
    };

    return (
        <div
            className={`${className ?? ''} ${sticky ? 'sticky top-0 bg-[var(--background)]' : ''}`}
            style={style}
        >
            <div
                role="tablist"
                aria-orientation={orientation}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={containerRef}
                className={getTabsContainerClasses({
                    orientation,
                    scrollable,
                    sticky,
                    multiRow,
                })}
            >
                {customSlotStart && <div className="mr-2">{customSlotStart}</div>}

                {tabs.map((tab) => {
                    const active = tab.id === localActiveTabId;
                    const isLoading = loadingTabs.includes(tab.id);
                    return (
                        <button
                            key={tab.id}
                            data-tabid={tab.id}
                            role="tab"
                            aria-selected={active}
                            aria-disabled={tab.disabled}
                            disabled={tab.disabled}
                            className={`${getTabClasses({
                                shape,
                                size,
                                active,
                                disabled: !!tab.disabled,
                                theme,
                            })} ${keyboardFocus ? 'focus-visible' : 'focus:outline-none'}`}
                            onClick={() => handleTabChange(tab.id)}
                            tabIndex={active ? 0 : -1}
                            draggable={draggable && !tab.disabled}
                            onDragStart={(e) => {
                                if (!draggable) return;
                                e.dataTransfer.setData('text/plain', tab.id);
                            }}
                            title={typeof tab.label === 'string' ? tab.label : undefined}
                        >
                            {tab.icon && <span className="mr-2">{tab.icon}</span>}
                            {tab.label}
                            {tab.badge !== undefined && (
                                <span className={getBadgeClasses()}>{tab.badge}</span>
                            )}
                            {tab.closable && (
                                <button
                                    type="button"
                                    aria-label="Close tab"
                                    onClick={(e) => handleCloseClick(e, tab.id)}
                                    className={getCloseButtonClasses()}
                                >
                                    &times;
                                </button>
                            )}
                            {isLoading && (
                                <span className="ml-2 animate-spin inline-block w-4 h-4 border-2 border-t-[var(--primary)] rounded-full border-gray-200" />
                            )}
                        </button>
                    );
                })}

                {customSlotEnd && <div className="ml-auto">{customSlotEnd}</div>}
            </div>

            {tabs.map((tab) => {
                const active = tab.id === localActiveTabId;
                if (lazyLoad && !loadedTabs.includes(tab.id)) {
                    // Lazy load: don't render inactive tabs until first active
                    return null;
                }
                return (
                    <div
                        key={tab.id}
                        role="tabpanel"
                        hidden={!active}
                        aria-labelledby={tab.id}
                        className={getPanelClasses()}
                    >
                        {tab.content}
                    </div>
                );
            })}
        </div>
    );
};
