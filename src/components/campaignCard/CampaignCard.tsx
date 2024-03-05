import React, { useState } from 'react';
import './CampaignCard.css';
import { AspectRatio, Button, ButtonGroup, Card, CardContent, CardOverflow, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy';
import { Spa } from '@mui/icons-material';
import Spacer from '../spacer/Spacer';
import { useNavigate } from 'react-router-dom';
import { deleteRoom } from '../../api/DeleteRoom';

export interface CampaignCardProps {
  token: string;
  title: string;
  description: string;
  imageUrl: string;
  nextSession: Date;
  status: 'active' | 'inactive';
  isOwner: boolean;
}


const CampaignCard = ({ token, title, description, imageUrl, nextSession, status, isOwner}: CampaignCardProps) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onDelete = () => {
        setShowDeleteModal(true);
    };

    const onDeleteConfirm = () => {
        deleteRoom(token).then(response => {
            if (response.error) {
                console.log("Error deleting room: ", response.error);
                return;
            }
            // console.log("Room deleted: ", response);
            setIsDeleted(true);
        });

        setShowDeleteModal(false);
    }

    const onView = () => {
        console.log('Edit');
    };

    const navigate = useNavigate();
    const onPlay = () => {
        navigate(`/campaign?sessionToken=${token}`);
    };

    return isDeleted ? null : (
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
                    { isOwner && <Button size="sm" color="danger" variant="plain" onClick={onDelete} sx={{fontWeight: 500, fontSize: "12px"}}>
                        Delete
                    </Button>}
                    <ButtonGroup >
                        {/* <Button size="md" onClick={onView} sx={{fontWeight: 500, fontSize: "12px"}}>
                            View
                        </Button> */}
                        <Button size="sm" variant="solid" color="primary" onClick={onPlay} sx={{fontWeight: 500, fontSize: "12px"}}>
                            <Spacer direction="horizontal" size="4px" />
                            Play
                            <Spacer direction="horizontal" size="4px" />
                        </Button>
                    </ButtonGroup>
                </Stack>
                  <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <ModalDialog layout="center">
                      <ModalClose />
                      <Typography level="h3" alignSelf="center">Delete {title}?</Typography>
                        <Spacer size="8px" />
                        <Typography>Are you sure you want to delete this campaign?</Typography>
                        <Spacer size="8px" />
                        <Stack direction="row" justifyContent="center">
                            <Button size="sm" color="danger" variant="plain" onClick={onDeleteConfirm}>Delete</Button>
                            <Spacer size="32px" />
                            <Button size="sm" variant="plain" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        </Stack>
                    </ModalDialog>
                  </Modal>
            </Card>
    );
};

export default CampaignCard;
