import React from 'react';

interface NormalizeIconOptions {
  size?: number;
  color?: string;
}

/**
 * Normalizes an icon component to have consistent size and color
 * while preserving the original icon's structure
 * 
 * @param icon - The React icon component to normalize
 * @param options - Normalization options (size, color)
 * @returns A normalized icon component with consistent styling
 */
export const normalizeIcon = (
  icon: React.ReactNode,
  options: NormalizeIconOptions = {}
): React.ReactNode => {
  const { size = 44, color } = options;

  if (!icon || !React.isValidElement(icon)) {
    return icon;
  }

  // Clone the icon element and apply normalized props
  const iconElement = icon as React.ReactElement<any>;
  const existingProps = iconElement.props || {};
  
  return React.cloneElement(iconElement, {
    ...existingProps,
    width: size,
    height: size,
    ...(color && { fill: color, color }),
  } as any);
};

