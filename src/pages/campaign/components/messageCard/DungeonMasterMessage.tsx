import React from 'react';
import Spacer from '../../../../components/spacer/Spacer';
import { Card, Stack, Typography, IconButton, Button, useTheme } from '@mui/joy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Message, TextToSpeechState } from '../../CampaignPage';
import { Stop } from '@mui/icons-material';

interface DungeonMasterMessageProps {
  message: Message;
  handleTTSRequest: (message: string) => void;
  handleTTSStop: () => void;
  isAudioPlaying: boolean;
}

const DungeonMasterMessage: React.FC<DungeonMasterMessageProps> = ({
  message,
  handleTTSRequest,
  handleTTSStop,
  isAudioPlaying,
}) => {
  const theme = useTheme();

  return (

    <Stack alignSelf="center" direction="column" alignItems="center">
        <Card sx={{marginBottom: "-36px",marginTop: "-24px", marginLeft: "-24px", zIndex: 3, padding: 0, width: "100px", backgroundColor: "transparent", borderWidth: 0}}>
            <img src='logo.png' style={{ backgroundColor: "transparent " }}/>
        </Card>
        <Card size="sm" sx={{
          width: "700px",
          [theme.breakpoints.down('lg')]: {
              width: "600px",
          },
          [theme.breakpoints.down('md')]: {
              width: "500px",
          },
          [theme.breakpoints.down('sm')]: {
              width: "300px",
          },
          }}>
        <Stack direction="column">
            <Stack sx={{ borderRadius: '8px', padding: '10px' }}>
            <Stack sx={{justifyContent: "space-between"}} direction="row">
                <Spacer direction="horizontal" size="10px" />
                <Stack>
                <Spacer direction="vertical" size="5px" />
                <Typography whiteSpace="pre-line" textAlign="center" level="body-sm">{message.content}</Typography>
                </Stack>
                {message.textToSpeechState === TextToSpeechState.DORMANT && <IconButton disabled={isAudioPlaying} aria-label={"Speak message"} onClick={() => handleTTSRequest(message.content)}>
                <VolumeUpIcon />
                </IconButton>
                }

                {message.textToSpeechState === TextToSpeechState.PLAYING && <IconButton aria-label={"Stop playing"} onClick={handleTTSStop}>
                <Stop />
                </IconButton>
                }

                {message.textToSpeechState === TextToSpeechState.LOADING && <Button sx={{width: "36px"}} loading aria-label={"Loading message"}>
                </Button>
                }
            </Stack>
            </Stack>
        </Stack>
        </Card>
        <Spacer direction="vertical" size="16px" />
        <Spacer direction="horizontal" size="16px" />
    </Stack>
  );
};

export default DungeonMasterMessage;
