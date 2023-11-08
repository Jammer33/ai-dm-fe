import React from 'react';
import CampaignCard, { CampaignCardProps } from './CampaignCard';
import FlexBox from '../flexBox/FlexBox';
import InputField from '../inputField/InputField';
import Button from '../button/Button';
import Typography from '../text/Typography';
import { Colors } from '../../colors';
import Spacer from '../spacer/Spacer';
import { useNavigate } from 'react-router-dom';

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
        <FlexBox color={Colors.DARKGRAY} justify="space-between" align="center" direction="column" style={{borderRadius: "10px"}}>
            <FlexBox direction="row" align="center"> 
                <Button type="Primary" size="Large" onClick={handleCreateCampaign}>
                    <Typography size="medium" weight="bold" color={Colors.WHITE}>Create New Campaign</Typography>
                </Button>   
                <Spacer direction="horizontal" size="16px" />
                <InputField
                    type="text"
                    placeholder="Search Campaigns"
                    onChange={handleSearchChange}
                />
            </FlexBox>
            <FlexBox direction="row" wrap="wrap" justify="center" align="flex-start">
            {filteredCampaigns.map(campaign => (
                <CampaignCard
                {...campaign}
                />
            ))}
            </FlexBox>
        </FlexBox>
    );
};

export default CampaignList;