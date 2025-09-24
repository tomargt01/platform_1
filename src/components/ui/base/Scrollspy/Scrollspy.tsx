import React from 'react';
import { ScrollspyProps } from './Scrollspy.types';
import { getScrollspyStyles } from './Scrollspy.styles';

const getNumberLabel = (index: number, numbering: ScrollspyProps['numbering']) => {
    if (numbering === 'abcd') return String.fromCharCode(97 + index); // a,b,c...
    if (numbering === 'roman') {
        const romans = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
        return romans[index] || '';
    }
    return (index + 1).toString();
};

const NumberBadge = ({ label, style }: { label: string; style: string }) => (
    <span
        className={`
      inline-flex items-center justify-center mr-2 
      ${style === 'number-circular' ? 'rounded-full w-6 h-6 bg-blue-100 text-blue-700 font-bold' : ''}
      ${style === 'number-boxed' ? 'rounded-md w-6 h-6 bg-gray-200 text-gray-800 font-semibold' : ''}
    `}
    >
        {label}
    </span>
);

export const Scrollspy: React.FC<ScrollspyProps> = ({
    items, activeId, onChange, variant = 'background', theme = 'light',
    numbering = '1234', customClass,
}) => (
    <nav className={`flex flex-col ${customClass || ''}`}>
        {items.map((item, i) => {
            const isActive = item.id === activeId;
            const styleClasses = getScrollspyStyles(theme, variant, isActive);

            return (
                <button
                    key={item.id}
                    className={`flex items-center px-4 py-2 text-left transition ${styleClasses} rounded mb-1`}
                    onClick={() => onChange(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                >
                    {(variant === 'number-circular' || variant === 'number-boxed' || variant === 'number-plain') && (
                        <NumberBadge label={getNumberLabel(i, numbering)} style={variant} />
                    )}
                    {item.label}
                </button>
            );
        })}
    </nav>
);
