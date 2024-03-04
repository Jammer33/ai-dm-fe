import React from 'react';
import './CampaignCard.css';
import { AspectRatio, Button, ButtonGroup, Card, CardContent, CardOverflow, Stack, Typography } from '@mui/joy';
import { Spa } from '@mui/icons-material';
import Spacer from '../spacer/Spacer';

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
            <Card size="md" variant="outlined" sx={{
                width: "220px",
                height: "125px",
                margin: "16px",
            }}>
                {/* <CardOverflow >
                <AspectRatio ratio="1.7">
                    <img src={imageUrl} alt={`${title} thumbnail`} className="campaign-card__image" />
                </AspectRatio>
                </CardOverflow> */}
                <CardContent>
                    <Stack spacing={1}>
                        <Typography level="title-md">{title}</Typography>
                        <Typography level="body-sm" sx={{ maxLines: 3 }}>{description}</Typography>
                    </Stack>
                </CardContent>
                {/* Buttons */}
                <Stack direction="row" justifyContent={"space-between"}>
                    <Button size="sm" color="danger" variant="plain" onClick={onDelete} sx={{fontWeight: 500, fontSize: "12px"}}>
                        Delete
                    </Button>
                    <ButtonGroup >
                        <Button size="md" onClick={onView} sx={{fontWeight: 500, fontSize: "12px"}}>
                            View
                        </Button>
                        <Button size="sm" variant="solid" color="primary" onClick={onPlay} sx={{fontWeight: 500, fontSize: "12px"}}>
                            <Spacer direction="horizontal" size="4px" />
                            Play
                            <Spacer direction="horizontal" size="4px" />
                        </Button>
                    </ButtonGroup>
                </Stack>


                
            </Card>
    );
};

export default CampaignCard;
