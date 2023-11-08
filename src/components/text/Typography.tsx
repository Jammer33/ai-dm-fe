import React from 'react';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';
import './Typography.css';

interface TypographyProps {
    size?: "small" | "medium" | "large" | "xlarge" | "xxlarge" | number | string;
    color?: Colors;
    weight?: 'normal' | 'bold' | 'bolder' | 'lighter';
    style?: 'normal' | 'italic' | 'oblique';
    alignment?: 'left' | 'right' | 'center' | 'justify';
    className?: string;
    lineHeight?: number;
    children?: any;
}

const Typography: React.FC<TypographyProps> = ({
    size = 'medium',
    color = Colors.BLACK,  // Set default color as BLACK from our enum
    weight = 'normal',
    style = 'normal',
    alignment = 'left',
    className = '',
    lineHeight,
    children = null, // This is the text that we want to display
}) => {
    const sizeMap: { [key: string]: string } = {
        small: TypographySizes.SMALL,
        medium: TypographySizes.MEDIUM,
        large: TypographySizes.LARGE,
        xlarge: TypographySizes.XLARGE,
    };

    const textStyles = {
        fontSize: typeof size === 'string' ? sizeMap[size] : `${size}px`,
        color: color,
        fontWeight: weight,
        fontStyle: style,
        textAlign: alignment as any,
        lineHeight: lineHeight ? `${lineHeight}px` : undefined,
        display: 'inline',
    };

    return <span style={textStyles} className={className}>{children}</span>;
};

export default Typography;
