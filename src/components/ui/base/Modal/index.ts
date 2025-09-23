// Base Modal
export { default as Modal } from './Modal';

// 1. Basic Modals
export {
    ConfirmationModal,
    AlertModal,
    InformationModal
} from './types/BasicModals';

// 2. Form Modals
export {
    InputModal,
    WizardModal,
    SearchModal
} from './types/FormModals';

// 3. Content Display Modals
export {
    LightboxModal,
    PreviewModal,
    FullscreenModal
} from './types/ContentModals';

// 4. Action Modals
export {
    ActionChoiceModal,
    ContextualModal,
    ProgressModal
} from './types/ActionModals';

// 5. Interactive Modals
export {
    DraggableModal,
    DrawerModal,
    BottomSheetModal,
    ResizableModal
} from './types/InteractiveModals';

// 6. Feedback Modals
export {
    SuccessModal,
    ErrorModal,
    WarningModal,
    InfoModal,
    LoadingModal
} from './types/FeedbackModals';

// 7. Specialized Modals
export {
    LoginModal,
    FilterModal,
    ChatModal
} from './types/SpecializedModals';

// 8. Advanced Modals
export {
    NestedModal,
    MultiContentModal,
    SplitModal,
    PersistentModal
} from './types/AdvancedModals';

// Types & Hooks
export type * from './Modal.types';
export { getThemeClasses, getModalStyles } from './Modal.styles';
