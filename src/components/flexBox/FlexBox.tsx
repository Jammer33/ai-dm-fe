import React, { ReactNode, CSSProperties, FC } from 'react';

interface FlexContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const FlexBox: FC<FlexContainerProps> = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'nowrap',
  className,
  style,
  children,
}) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    ...style,
  };

  return <div className={className} style={flexStyle}>{children}</div>;
};

export default FlexBox;
