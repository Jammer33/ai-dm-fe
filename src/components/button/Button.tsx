import React from 'react';
import './Button.css';

interface ButtonProps {
    type: 'Primary' | 'Secondary';
    onDarkBackground?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    size?: 'Small' | 'Medium' | 'Large';
}

const Button: React.FC<ButtonProps> = ({ type, onDarkBackground, onClick, children, size = 'Medium' }) => {
    let className = 'custom-btn';

    if (type) {
        className += ` ${type.toLowerCase()}`;
    }

    if (onDarkBackground) {
        className += ` dark-bg`;
    }

    // Adding size
    className += ` ${size.toLowerCase()}`;

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
