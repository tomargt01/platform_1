import { ReactNode, CSSProperties } from 'react';

export type TabShape = 'rounded' | 'square' | 'pill' | 'underline';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabTheme = 'light' | 'dark' | 'purple' | 'pink' | 'green' | 'blue';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  closable?: boolean;
  menuOptions?: { label: string; action: (id: string) => void }[];
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  onTabClose?: (id: string) => void;
  shape?: TabShape;
  orientation?: TabOrientation;
  size?: TabSize;
  theme?: TabTheme;
  scrollable?: boolean;
  draggable?: boolean;
  nestedTabs?: boolean;
  customSlotStart?: ReactNode;
  customSlotEnd?: ReactNode;
  animated?: boolean;
  loadingTabs?: string[];
  lazyLoad?: boolean;
  sticky?: boolean;
  multiRow?: boolean;
  sidebar?: boolean;
  keyboardNav?: boolean;
  routing?: boolean;
  className?: string;
  style?: CSSProperties;
}
