import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type VariantSize = 'xs' | 'sm' | 'md' | 'lg'|'xl'|'xxl';
export type Intent = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'white' | 'gray' | 'theme-adaptive';
export type CheckboxType = 'standard' | 'toggle';

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  variantSize?: VariantSize;
  intent?: Intent;
  type?: CheckboxType;
  label?: ReactNode;
  disabled?: boolean;
  checkedContent?: ReactNode;
  onText?: string;
  offText?: string;
  borderColor?: string; // Optional override for border color
  circleColor?: string; // Optional override for circle color
  bgColor?: string; // Optional override for background color
}
