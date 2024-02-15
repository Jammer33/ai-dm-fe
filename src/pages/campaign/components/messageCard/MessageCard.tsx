import React, { useState } from 'react';
import Spacer from '../../../../components/spacer/Spacer';
import { Avatar, Box, Card, Stack, Typography, IconButton } from '@mui/joy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Determine justify-content based on alignment
  let justify: 'flex-start' | 'flex-end' | 'center' = 'flex-start';
  if (alignment === 'right') justify = 'flex-end';
  if (alignment === 'center') justify = 'center';

  let direction: 'row' | 'row-reverse' = 'row';
  if (alignment === 'right') direction = 'row-reverse';

  let cardVarient: 'solid' | 'soft' = 'solid';
  if (alignment === 'left') cardVarient = 'soft';

  let isUser = alignment === 'right';

  // const speakMessage = () => {
  //   const speech = new SpeechSynthesisUtterance(messageText);
  //   speechSynthesis.speak(speech);
  //   setIsSpeaking(true);

  //   speech.onend = () => {
  //     setIsSpeaking(false);
  //   };
  // };

  const speakMessage = () => {
    // If currently speaking, cancel speech
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
  
    const speech = new SpeechSynthesisUtterance(messageText);
  
    // Adjust speech parameters for more human-like sound
    speech.pitch = 1; // Range from 0 to 2, default is 1
    speech.rate = 1; // Range from 0.1 to 10, default is 1
    speech.volume = 1; // Range from 0 to 1, default is 1
  
    // Get voices
    const voices = speechSynthesis.getVoices();
  
    // Find a human-like voice, if available
    const humanVoice = voices.find(voice => voice.name.includes('Google')); // Example: 'Google UK English Female'
  
    // Set the voice if found
    if (humanVoice) {
      speech.voice = humanVoice;
    }
  
    // Speak the message
    speechSynthesis.speak(speech);
    setIsSpeaking(true);
  
    speech.onend = () => {
      setIsSpeaking(false);
    };
  };

  return (
  
    <Stack direction={direction} alignItems="center">
    <Spacer direction="horizontal" size="16px" />
    <Avatar src={avatarSrc} alt={name} sx={{ backgroundColor: isUser ? "background.level2" : "" }} />
    <Spacer direction="horizontal" size="16px" />
    <Card size="sm" sx={{ width: "fit-content", backgroundColor: isUser ? "background.level2" : "" }} variant={cardVarient}>
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
            <IconButton aria-label={isSpeaking ? "Stop speaking" : "Speak message"} onClick={speakMessage}>
              {isSpeaking ? <StopIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
    </Stack>
  );
};

export default MessageCard;
