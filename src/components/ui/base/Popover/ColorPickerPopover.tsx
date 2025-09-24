'use client';

import React, { useState, useCallback } from 'react';
import BasePopover from './BasePopover';
import { BasePopoverProps } from './Popover.types';
import { Palette, Eye, Copy, Check } from 'lucide-react';

interface ColorPickerPopoverProps extends Omit<BasePopoverProps, 'children'> {
    value?: string;
    onChange?: (color: string) => void;
    presetColors?: string[];
    showPresets?: boolean;
    showEyeDropper?: boolean;
    showAlpha?: boolean;
    format?: 'hex' | 'rgb' | 'hsl';
    children: React.ReactNode;
}

const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({
    value = '#3B82F6',
    onChange,
    presetColors,
    showPresets = true,
    showEyeDropper = true,
    showAlpha = false,
    format = 'hex',
    children,
    ...popoverProps
}) => {
    const [currentColor, setCurrentColor] = useState(value);
    const [copied, setCopied] = useState(false);

    const defaultPresets = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D2B4DE',
        '#AED6F1', '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB',
        '#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#34495E',
        '#F39C12', '#E67E22', '#E74C3C', '#ECF0F1', '#95A5A6'
    ];

    const finalPresets = presetColors || defaultPresets;

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const formatColor = (color: string) => {
        if (format === 'hex') return color;

        const rgb = hexToRgb(color);
        if (!rgb) return color;

        if (format === 'rgb') {
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }

        if (format === 'hsl') {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }

        return color;
    };

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
        onChange?.(color);
    };

    const handleEyeDropper = async () => {
        if ('EyeDropper' in window) {
            try {
                // @ts-ignore - EyeDropper is experimental
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                handleColorChange(result.sRGBHex);
            } catch (error) {
                console.error('EyeDropper failed:', error);
            }
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <BasePopover {...popoverProps} size="lg" className="p-0">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">Color Picker</h3>
                    </div>
                    {showEyeDropper && 'EyeDropper' in window && (
                        <button
                            onClick={handleEyeDropper}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            title="Use Eye Dropper"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Current Color Display */}
                <div className="mb-4">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-inner"
                            style={{ backgroundColor: currentColor }}
                        />
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={formatColor(currentColor)}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={() => copyToClipboard(formatColor(currentColor))}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    title="Copy color code"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Color Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Color
                    </label>
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                </div>

                {/* Alpha Slider (if enabled) */}
                {showAlpha && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Opacity
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="100"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                )}

                {/* Preset Colors */}
                {showPresets && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preset Colors
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                            {finalPresets.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorChange(color)}
                                    className={`
                    w-8 h-8 rounded-md border-2 transition-all hover:scale-110 focus:scale-110 focus:outline-none
                    ${currentColor.toLowerCase() === color.toLowerCase()
                                            ? 'border-gray-800 ring-2 ring-gray-300'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }
                  `}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Format Options */}
                <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Format:</span>
                        {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
                            <button
                                key={fmt}
                                onClick={() => {
                                    // Format change logic would go here
                                    console.log(`Format changed to ${fmt}`);
                                }}
                                className={`
                  px-2 py-1 rounded text-xs font-medium transition-colors
                  ${format === fmt
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }
                `}
                            >
                                {fmt.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {children}
        </BasePopover>
    );
};

export default ColorPickerPopover;
