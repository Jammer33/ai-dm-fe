import React from 'react';

// Define props interface
interface SpacerProps {
  direction?: 'horizontal' | 'vertical';
  size: number | string;
}

// Functional component
const Spacer: React.FC<SpacerProps> = ({ direction = 'horizontal', size }) => {
  // Define style object
  const style = {
    display: 'block',
    width: direction === 'horizontal' ? size : 'auto',
    height: direction === 'vertical' ? size : 'auto',
  };

  // Render
  return <div style={style} />;
};

export default Spacer;
