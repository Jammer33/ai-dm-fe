import React, { CSSProperties } from 'react';

interface LogoProps {
    size?: number; // in pixels
    alignment?: 'left' | 'right' | 'center'; // Horizontal alignment
    verticalAlignment?: 'top' | 'middle' | 'bottom'; // Vertical alignment
    src?: string; // Logo source
    alt?: string; // Alternative text
    borderRadius?: number; // Border radius
    onClick?: () => void; // Click handler
    absolute?: boolean; // Absolute positioning
    top?: number; // Top position
}

const Logo: React.FC<LogoProps> = ({
    size = 100,
    alignment = 'left',
    verticalAlignment = 'top',
    src = './logo.png',
    alt = 'logo',
    borderRadius = 0,
    onClick,
    absolute = false,
    top = 0
}) => {
  const styles: CSSProperties = {
    width: size,
    height: size,
    alignSelf: alignment,
    verticalAlign: verticalAlignment === 'middle' ? 'middle' : verticalAlignment === 'bottom' ? 'bottom' : 'top',
    borderRadius: borderRadius,
    position: absolute ? 'absolute' : 'relative',
    top: top,
    left: '50%',
    transform: "translate(-50%, -50%)",
    
  };

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      onClick={onClick}
    />
  );
};

export default Logo;
