import React from 'react';
import './DashboardMainArea.css';
import Container from '../../../components/container/Container';
import FlexBox from '../../../components/flexBox/FlexBox';
import Button from '../../../components/button/Button';
import { Card, Stack, Typography } from '@mui/joy';

interface Props {
    username: string;
    onNewCampaignClick: () => void;
}

const DashboardMainArea = ({ username, onNewCampaignClick }: Props) => {
  return (
    <Card sx={{margin: "16px"}}>
      {/* Welcome Banner */}
      <Stack direction="column" alignItems="center">
        <Typography level="title-lg">Welcome, to your dashboard {username}!</Typography>
        <Typography>Create, view and manage campaigns</Typography>
      </Stack>
    </Card>
  );
};

export default DashboardMainArea;
