import React, { useState } from 'react';
import { Modal, ModalDialog, ModalClose, Typography, Button, FormControl, Input, Textarea, FormHelperText } from "@mui/joy"
import { Stack } from "@mui/system"
import Spacer from "../spacer/Spacer"
import { useNavigate } from 'react-router-dom';

export interface NewCampaignModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_TITLE_LENGTH = 35;
const MAX_DESCRIPTION_LENGTH = 200;

const NewCampaignModal = ({showModal, setShowModal}: NewCampaignModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const onCreate = () => {
        if (title.length > 0) {
            setShowModal(false);
            navigate(`/campaign`, {state: {title, description}})
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_TITLE_LENGTH) {
            setTitle(event.target.value);
        }
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(event.target.value);
        }
    }

    return (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ModalDialog sx={{minWidth: "350px"}} size="lg" layout="center">
                <ModalClose />
                <Typography level="h3" alignSelf="center">Create Campaign</Typography>
                <Spacer size="8px" />

                <FormControl>
                    <Typography>Title</Typography>
                    <Input required value={title} onChange={handleTitleChange} />
                    <FormHelperText>{"("+title.length+"/"+MAX_TITLE_LENGTH+")"}</FormHelperText>
                </FormControl>

                <FormControl>
                    <Typography>Description</Typography>
                    <Textarea value={description} onChange={handleDescriptionChange} />
                    <FormHelperText>{"("+description.length+"/"+MAX_DESCRIPTION_LENGTH+")"}</FormHelperText>
                </FormControl>

                <Spacer size="8px" direction="vertical" />

                <Stack direction="row" justifyContent="center">
                    <Button size="sm" variant="plain" color="neutral" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Spacer size="32px" />
                    <Button size="sm" color="primary" variant="solid" onClick={onCreate}>Create</Button>
                </Stack>
            </ModalDialog>
        </Modal>
    )
}

export default NewCampaignModal;