import React, { useEffect, useState } from 'react';
import CampaignCard, { CampaignCardProps } from './CampaignCard';
import FlexBox from '../flexBox/FlexBox';
import { Colors } from '../../colors';
import Spacer from '../spacer/Spacer';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Input, Typography } from '@mui/joy';
import NewCampaignModal from '../newCampaignModal/NewCampaignModal';
import JoinCampaignModal from '../joinCampaignModal/JoinCampaignModal';

interface Props {
    campaigns: CampaignCardProps[];
}

const CampaignList = ({ campaigns }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
    const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
    const [showJoinCampaignModal, setShowJoinCampaignModal] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filteredCampaigns = campaigns.filter(campaign => campaign.title.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredCampaigns(filteredCampaigns);
    };

    const handleCreateCampaign = () => {
        setShowCreateCampaignModal(true);
    }

    const handleJoinCampaign = () => {
        setShowJoinCampaignModal(true);
    }    

    useEffect(() => {
        setFilteredCampaigns(campaigns);
    }, [campaigns]);

    return (
        <FlexBox justify="space-between" align="center" direction="column" style={{borderRadius: "10px"}}>
            <FlexBox direction="row" align="center"> 
                <Button color="neutral" size="md" onClick={handleJoinCampaign} >
                    Join Campaign
                </Button>  
                <Spacer direction="horizontal" size="16px" />
                <Button color="primary" size="md" onClick={handleCreateCampaign}>
                    Create Campaign
                </Button>   
                <Spacer direction="horizontal" size="16px" />
                <Input
                    size="md"
                    type="text"
                    placeholder="Search Campaigns"
                    onChange={handleSearchChange}
                />
            </FlexBox>
            <FlexBox direction="row" wrap="wrap" justify="center" align="flex-start">
            {filteredCampaigns.map((campaign,idx) => (
                <CampaignCard key={idx}
                {...campaign}
                />
            ))}
            </FlexBox>
            <NewCampaignModal showModal={showCreateCampaignModal} setShowModal={setShowCreateCampaignModal} />
            <JoinCampaignModal showModal={showJoinCampaignModal} setShowModal={setShowJoinCampaignModal} />
        </FlexBox>
    );
};

export default CampaignList;