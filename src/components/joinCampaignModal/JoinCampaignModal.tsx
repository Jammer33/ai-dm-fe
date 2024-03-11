import React, { useState } from 'react';
import { Modal, ModalDialog, ModalClose, Typography, Button, FormControl, Input, Textarea, FormHelperText } from "@mui/joy"
import { Stack } from "@mui/system"
import Spacer from "../spacer/Spacer"
import { useNavigate } from 'react-router-dom';

export interface JoinCampaignModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinCampaignModal = ({showModal, setShowModal}: JoinCampaignModalProps) => {
    const [sessionToken, setSessionToken] = useState('');

    const navigate = useNavigate();

    const onJoin = () => {
        setShowModal(false);
        navigate(`/campaign?sessionToken=${sessionToken}`);
    }

    const handleSessionTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSessionToken(event.target.value);
    }

    return (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ModalDialog sx={{minWidth: "350px"}} size="lg" layout="center">
                <ModalClose />
                <Typography level="h3" alignSelf="center">Join Campaign</Typography>
                <Spacer size="8px" />

                <FormControl>
                    <Typography>Session Token</Typography>
                    <Input required value={sessionToken} onChange={handleSessionTokenChange} />
                </FormControl>

                <Spacer size="8px" direction="vertical" />

                <Stack direction="row" justifyContent="center">
                    <Button size="sm" variant="plain" color="neutral" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Spacer size="32px" />
                    <Button size="sm" color="primary" variant="solid" onClick={onJoin}>Join</Button>
                </Stack>
            </ModalDialog>
        </Modal>
    )
}

export default JoinCampaignModal;