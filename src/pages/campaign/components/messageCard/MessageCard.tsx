import React from 'react';
import Spacer from '../../../../components/spacer/Spacer';
import { Avatar, Box, Card, Stack, Typography } from '@mui/joy';


interface MessageCardProps {
  alignment: 'left' | 'right' | 'center';
  avatarSrc?: string;
  name: string;
  messageText: string;
}

const MessageCard: React.FC<MessageCardProps> = ({
  alignment,
  avatarSrc,
  name,
  messageText,
}) => {
  // Determine justify-content based on alignment
  let justify: 'flex-start' | 'flex-end' | 'center' = 'flex-start';
  if (alignment === 'right') justify = 'flex-end';
  if (alignment === 'center') justify = 'center';

  let direction: 'row' | 'row-reverse' = 'row';
  if (alignment === 'right') direction = 'row-reverse';

  let cardVarient: 'solid' | 'soft' = 'solid';
  if (alignment === 'left') cardVarient = 'soft';

  let isUser = alignment === 'right';

  return (
    <Stack direction={direction} alignItems="center">
      <Spacer direction="horizontal" size="16px" />
      <Avatar src={avatarSrc} alt={name} sx={{backgroundColor: isUser ? "background.level2" : ""}}/>
      <Spacer direction="horizontal" size="16px" />
      <Card size="sm" sx={{width: "fit-content", backgroundColor: isUser ? "background.level2" : ""}} variant={cardVarient}>
        <Stack direction="column" justifyContent={justify}>
          <Stack sx={{ borderRadius: '8px', padding: '10px' }}>
            <Stack direction="row">
              
              <Spacer direction="horizontal" size="10px" />
              <Stack alignItems={justify}>
                <Typography level="title-sm">
                  {name}
                </Typography>
                <Spacer direction="vertical" size="5px" />
                <Typography level="body-sm">{messageText}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default MessageCard;
