import React from 'react';
import CampaignCard, { CampaignCardProps } from './CampaignCard';
import FlexBox from '../flexBox/FlexBox';
import { Colors } from '../../colors';
import Spacer from '../spacer/Spacer';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from '@mui/joy';

interface Props {
    campaigns: CampaignCardProps[];
}

const CampaignList = ({ campaigns }: Props) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredCampaigns, setFilteredCampaigns] = React.useState(campaigns);
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filteredCampaigns = campaigns.filter(campaign => campaign.title.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredCampaigns(filteredCampaigns);
    };

    const handleCreateCampaign = () => {
        navigate('/create-campaign');
    }

    return (
        <FlexBox justify="space-between" align="center" direction="column" style={{borderRadius: "10px"}}>
            <FlexBox direction="row" align="center"> 
                <Button size="md" onClick={handleCreateCampaign}>
                    Create New Campaign
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
        </FlexBox>
    );
};

export default CampaignList;