import React from 'react';
import FlexBox from '../../../../components/flexBox/FlexBox';
import Spacer from '../../../../components/spacer/Spacer';
import Typography from '../../../../components/text/Typography';
import TypographySizes from '../../../../TypographySizes';


interface MessageCardProps {
  alignment: 'left' | 'right' | 'center';
  avatarSrc: string;
  name: string;
  messageText: string;
  bgColor: string;
}

const MessageCard: React.FC<MessageCardProps> = ({
  alignment,
  avatarSrc,
  name,
  messageText,
  bgColor,
}) => {
  // Determine justify-content based on alignment
  let justify: 'flex-start' | 'flex-end' | 'center' = 'flex-start';
  if (alignment === 'right') justify = 'flex-end';
  if (alignment === 'center') justify = 'center';

  return (
    <FlexBox direction="column" justify={justify}>
      <div style={{ backgroundColor: bgColor, borderRadius: '8px', padding: '10px' }}>
        <FlexBox>
          <img src={avatarSrc} alt={name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <Spacer direction="horizontal" size="10px" />
          <div>
            <Typography size={TypographySizes.SMALL} weight="bold">
              {name}
            </Typography>
            <Spacer direction="vertical" size="5px" />
            <Typography size={TypographySizes.SMALL}>{messageText}</Typography>
          </div>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default MessageCard;
