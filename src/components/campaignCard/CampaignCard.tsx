import React from 'react';
import Container from '../container/Container';
import Spacer from '../spacer/Spacer';
import Typography from '../text/Typography';
import FlexBox from '../flexBox/FlexBox';
import Button from '../button/Button';
import { Colors } from '../../colors';
import './CampaignCard.css';

export interface CampaignCardProps {
  token: string;
  title: string;
  description: string;
  imageUrl: string;
  nextSession: Date;
  status: 'active' | 'inactive';
}

const CampaignCard = ({ token, title, description, imageUrl, nextSession, status}: CampaignCardProps) => {

    const onDelete = () => {
        console.log('Delete');
    };

    const onView = () => {
        console.log('Edit');
    };

    const onPlay = () => {
        console.log('Play');
    };

    return (
            <FlexBox direction="column" align="center" justify="space-between" className="campaign-card">
                <img src={imageUrl} alt={`${title} thumbnail`} className="campaign-card__image" />
                <Spacer direction="vertical" size="8px" />
                <Typography size="large" weight="bold">{title}</Typography>
                
                <Typography alignment='center'>{description}</Typography>

                <Spacer direction="vertical" size="4px" />
                <Typography size="small" color={Colors.GRAY}>Next Session: {nextSession.toDateString()}</Typography>
                <Typography size="small" color={status === 'active' ? Colors.GREEN : Colors.ERROR}>{status.toUpperCase()}</Typography>
                <Spacer direction="vertical" size="12px" />
                <FlexBox direction="column">
                    <FlexBox justify="space-around" align="center">
                        <Button type="Primary" size="Small" onClick={onPlay}>Play</Button>
                            <Spacer direction="horizontal" size="8px" />
                        <Button type="Secondary" size="Small" onClick={onView}>View</Button>
                            <Spacer direction="horizontal" size="8px" />
                        <Button type="Secondary" size="Small" onClick={onDelete}>
                            <Typography size="small" weight="bold" color={Colors.SECONDARY} >Delete</Typography>
                        </Button>
                    </FlexBox>
                    <Spacer direction="vertical" size="8px" />
                </FlexBox>
            </FlexBox>
    );
};

export default CampaignCard;
