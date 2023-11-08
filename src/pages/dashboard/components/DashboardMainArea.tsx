import React from 'react';
import './DashboardMainArea.css';
import Container from '../../../components/container/Container';
import FlexBox from '../../../components/flexBox/FlexBox';
import Typography from '../../../components/text/Typography';
import Button from '../../../components/button/Button';

interface Props {
    username: string;
    onNewCampaignClick: () => void;
}

const DashboardMainArea = ({ username, onNewCampaignClick }: Props) => {
  return (
    <Container>
      {/* Welcome Banner */}
      <FlexBox direction="column" align="center" className="dashboard-welcome-banner">
        <Typography size="large" weight="bold">Welcome, to your dashboard {username}!</Typography>
        <Typography>Create, view and manage campaigns</Typography>
      </FlexBox>
    </Container>
  );
};

export default DashboardMainArea;
