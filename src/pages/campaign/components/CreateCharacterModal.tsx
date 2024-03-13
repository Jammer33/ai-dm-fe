import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, ModalDialog, Typography, Button, FormControl, Input, Textarea, FormHelperText, Slider } from "@mui/joy"
import { Stack } from "@mui/system"
import Spacer from '../../../components/spacer/Spacer';
import { CampaignState, Character } from '../CampaignPage';

export interface CreateCharacterModalProps {
    showModal: boolean;
    setGameState: Dispatch<SetStateAction<CampaignState>>;
    startGame: (character: Character) => void;
}

const MAX_TITLE_LENGTH = 35;
const MAX_DESCRIPTION_LENGTH = 200;

const CreateCharacterModal = ({showModal, setGameState, startGame}: CreateCharacterModalProps) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState(3);
    const [race, setRace] = useState('');
    const [_class, setClass] = useState('');

    const [error, setError] = useState({
        name: false,
        race: false,
        _class: false,
    });

    const onCreate = () => {
        const newErrors = {
            name: !name,
            race: !race,
            _class: !_class,
        };

        setError(newErrors);

        // If any field is invalid, prevent form submission
        if (Object.values(newErrors).some(hasError => hasError)) {
            return;
        }

        setGameState(CampaignState.ACTIVE);
        startGame({
            name,
            level,
            race,
            _class,
        });
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_TITLE_LENGTH) {
            setName(event.target.value);
            setError({...error, name: false});
        }
    }

    const handleLevelChange = (event: Event, value: number | number[], activeThumb: number) => {
        setLevel(value as number);
    }

    const handleRaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_TITLE_LENGTH) {
            setRace(event.target.value);
            setError({...error, race: false});
        }
    }

    const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_TITLE_LENGTH) {
            setClass(event.target.value);
            setError({...error, _class: false});
        }
    }

    return (
        <Modal open={showModal}>
            <ModalDialog sx={{minWidth: "350px"}} size="lg" layout="center">
                <Typography level="h3" alignSelf="center">Create New Character</Typography>
                <Spacer size="8px" />

                <FormControl>
                    <Typography>Name</Typography>
                    <Input error={error.name} required value={name} onChange={handleNameChange} />
                    <FormHelperText>{"("+name.length+"/"+MAX_TITLE_LENGTH+")"}</FormHelperText>
                </FormControl>

                <FormControl>
                    <Typography>Level <Typography>{level}</Typography></Typography>
                    <Slider marks value={level} onChange={handleLevelChange} defaultValue={3} max={20} min={1} />
                </FormControl>

                <FormControl>
                    <Typography>Race</Typography>
                    <Input error={error.race} value={race} onChange={handleRaceChange} />
                    <FormHelperText>{"("+race.length+"/"+MAX_TITLE_LENGTH+")"}</FormHelperText>
                </FormControl>

                <FormControl>
                    <Typography>Class</Typography>
                    <Input error={error._class} value={_class} onChange={handleClassChange} />
                    <FormHelperText>{"("+_class.length+"/"+MAX_TITLE_LENGTH+")"}</FormHelperText>
                </FormControl>

                <Spacer size="8px" direction="vertical" />

                <Stack direction="row" justifyContent="center">
                    <Button size="sm" color="primary" variant="solid" onClick={onCreate}>Create</Button>
                </Stack>
            </ModalDialog>
        </Modal>
    )
}

export default CreateCharacterModal;