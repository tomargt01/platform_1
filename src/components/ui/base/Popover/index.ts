// Base Components
export { default as BasePopover } from './BasePopover';

// User & Profile Components
export { default as UserProfilePopover } from './UserProfilePopover';

// Communication & Notifications
export { default as NotificationPopover } from './NotificationPopover';

// Navigation & Actions
export { default as MenuPopover } from './MenuPopover';
export { default as QuickActionsPopover } from './QuickActionsPopover';

// Search & Filtering
export { default as SearchPopover } from './SearchPopover';
export { default as FilterPopover } from './FilterPopover';

// Date & Time
export { default as DateRangePopover } from './DateRangePopover';

// UI & Interaction
export { default as ColorPickerPopover } from './ColorPickerPopover';
export { default as SharePopover } from './SharePopover';

// Information & Help
export { default as InfoPopover } from './InfoPopover';
export { default as HelpTooltipPopover } from './HelpTooltipPopover';

// Confirmation & Actions
export { default as ConfirmationPopover } from './ConfirmationPopover';

// Types
export type {
    Theme,
    PopoverPlacement,
    PopoverSize,
    PopoverTrigger,
    BasePopoverProps,
    PopoverContentProps,
    UserProfile,
    NotificationItem,
    MenuItem,
    FilterOption,
} from './Popover.types';

// Re-export styles utility
export { getThemeStyles, getSizeStyles } from './Popover.styles';
