
import React, { useState, useEffect } from 'react';

import CampaignList from '../../components/campaignCard/CampaignList';
import DashboardMainArea from './components/DashboardMainArea';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import Container from '../../components/container/Container';
import { Sheet } from '@mui/joy';
import { getRooms } from '../../api/GetRooms';
import { CampaignCardProps } from '../../components/campaignCard/CampaignCard';
import { useAuth } from '../../provider/AuthProvider';

const Dashboard: React.FC = () => {
    const [campaigns, setCampaigns] = useState(new Array<CampaignCardProps>());
    const {user} = useAuth();

    const getCampaignRooms = async () => {
        try {
            const response = await getRooms(); // find all the chat roms that this player has previously joined
            
            if (response.error) {
                console.log("Ran into an error while finding a list of rooms: ", response.error);
                return;
            }
            
            let roomArray : Array<string> = JSON.parse(response.message);
            let roomArrayObj = new Array<CampaignCardProps>();
            
            roomArray.forEach(roomStr => {
                let roomObj = JSON.parse(roomStr);
                let campaignRoom : CampaignCardProps = {
                    token: roomObj.campaignToken,
                    title: (roomObj.name === '') ? 'No Title' : roomObj.name,
                    description: (roomObj.description === '') ? 'No Description' : roomObj.description,
                    nextSession: new Date(),
                    status: 'active',
                    imageUrl: 'campaign_cover.png',
                    isOwner: roomObj.isOwner,
                };
                roomArrayObj.push(campaignRoom);
            });
            setCampaigns(roomArrayObj);
        } catch (error) {
            console.log("Ran into an error while finding a list of rooms: ", error);
        }
    }

    useEffect(() => {   
        getCampaignRooms();
    }, []);

    useEffect(() => {
        console.log(campaigns);
    }, [campaigns]);
    
    return (
        <Sheet>
            <DashboardNavbar />
            <Container>
                <DashboardMainArea 
                    username={user?.username ?? "user"}
                    onNewCampaignClick={() => console.log('New Campaign Clicked')}
                />
                <CampaignList
                    campaigns={campaigns}
                />
            </Container>
        </Sheet>
    );
};

export default Dashboard;
