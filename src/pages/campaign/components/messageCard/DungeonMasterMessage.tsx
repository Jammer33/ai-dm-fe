import React from 'react';
import Spacer from '../../../../components/spacer/Spacer';
import { Card, Stack, Typography, IconButton } from '@mui/joy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

interface DungeonMasterMessageProps {
  messageText: string;
  handleTTSRequest: (message: string) => void;
}

const DungeonMasterMessage: React.FC<DungeonMasterMessageProps> = ({
  messageText,
  handleTTSRequest,
}) => {
  return (

    <Stack alignSelf="center" direction="column" alignItems="center">
        <Card sx={{marginBottom: "-36px",marginTop: "-24px", zIndex: 3, padding: 0, width: "100px", backgroundColor: "transparent", borderWidth: 0}}>
            <img src='logo.png' style={{ backgroundColor: "transparent " }}/>
        </Card>
        <Card size="sm" sx={{ width: "700px"}}>
        <Stack direction="column">
            <Stack sx={{ borderRadius: '8px', padding: '10px' }}>
            <Stack sx={{justifyContent: "space-between"}} direction="row">
                <Spacer direction="horizontal" size="10px" />
                <Stack>
                <Spacer direction="vertical" size="5px" />
                <Typography textAlign="center" level="body-sm">{messageText}</Typography>
                </Stack>
                <IconButton aria-label={"Speak message"} onClick={() => handleTTSRequest(messageText)}>
                <VolumeUpIcon />
                </IconButton>
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
