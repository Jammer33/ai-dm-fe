import React from 'react';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import MessageCard from './components/messageCard/MessageCard';
import { Button, Input, Sheet, Stack, Textarea } from '@mui/joy';
import Spacer from '../../components/spacer/Spacer';

interface Props {
    // Define props here
}

const CampaignPage: React.FC<Props> = (props) => {
    // Define component logic here

    return (
        <Sheet sx={{minHeight:"100VH"}}>
            <DashboardNavbar />
            <Stack sx={{margin: "0 300px"}}>
                <Spacer direction="vertical" size="16px" />
                <MessageCard alignment='right' name='James' messageText='Hi! Excited to begin this campaign :D' />
                <MessageCard alignment='left' name='Ariel' messageText='Yeah me too! Thanks so much for putting this website together. This should be a lot of fun' />
            </Stack>
            <Textarea
                size="sm"
                placeholder="Enter your next move"
                onChange={() => {}}
                sx={{position: "fixed", bottom: "16px", width: "500px", padding: "8px", left:0, right:0, margin: "auto"}}
                maxRows={5}
            />

        </Sheet>
    );
};

export default CampaignPage;

