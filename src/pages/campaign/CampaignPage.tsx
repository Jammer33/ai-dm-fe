import React, { useState, useEffect, useRef }  from 'react';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import MessageCard from './components/messageCard/MessageCard';
import '../../components/dashboardNavbar/DashboardNavbar.css';
import { Box, Button, FormControl, FormLabel, Input, Sheet, Stack, Textarea, useTheme } from '@mui/joy';
import Spacer from '../../components/spacer/Spacer';
import { socket } from '../../socket';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import CreateCharacterModal from './components/CreateCharacterModal';
import { getIsInRoom } from '../../api/GetIsInRoom';
import DungeonMasterMessage from './components/messageCard/DungeonMasterMessage';
import { useAuth } from '../../provider/AuthProvider';
import { Mic, Send } from '@mui/icons-material';

interface Props {
    // Define props here
}

interface CampaignInfo {
    title: string;
    description: string;
}

export enum CampaignState {
    UNKNOWN,
    CREATE_CHARACTER,
    ACTIVE,
}

export interface Character {
    name: string;
    level: number;
    race: string;
    _class: string;
}

export type Message = { userToken: string; content: string; createdAt: Date; textToSpeechState: TextToSpeechState;}

export enum TextToSpeechState {
    DORMANT,
    LOADING,
    PLAYING,
}
    


const CampaignPage: React.FC<Props> = (props) => {
    // Define component logic here
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [inputText, setInputText] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>({
        title: '',
        description: '',
    });
    const [state, setState] = useState<CampaignState>(CampaignState.UNKNOWN);
    const [userTokenToCharacterName, setUserTokenToCharacterName] = useState<Map<string, string>>(new Map());

    const [isInRoom, setIsInRoom] = useState<Boolean>(false);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);

    const DM_COMPLETION_TOKEN = "[DONE]";
    const parsed = queryString.parse(useLocation().search);
    const messageStackRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const theme = useTheme();

    const audioContext = new window.AudioContext();

    const [source, setSource] = useState<any>();

    const user = useAuth().user;
    let session_token = '';
    const startGameWithCharacter = (character: Character) => {
        if (location.state && location.state.title) {
            // create a new game
            createNewGame(campaignInfo.title, campaignInfo.description, character);
            // clear the campaign info
            setCampaignInfo({
                title: '',
                description: '',
            });
            // clear the location state
            window.history.replaceState({}, '', window.location.pathname);
        } else {
            // join an existing game with new character
            handleJoinGame(sessionToken, character);
        }
    }

    const getIsPlayerInRoom = async (campaignToken: string) => {

        if (campaignToken) {
            const isPlayerInRoom = await getIsInRoom(campaignToken);
            setIsInRoom(isPlayerInRoom.message);

            if (!isPlayerInRoom.message) {
                setState(CampaignState.CREATE_CHARACTER);
                return;
            }

            if(campaignToken.length > 0) {
                handleJoinGame(campaignToken);
            }
        } else {
            // we are creating a new campaign
            setCampaignInfo({
                title: location.state.title,
                description: location.state.description,
            });
            setState(CampaignState.CREATE_CHARACTER);
        }
    }

    useEffect(() => {
        // Scroll to the bottom of the message stack when it updates
        if (messageStackRef.current) {
            messageStackRef.current.scrollTop = messageStackRef.current.scrollHeight;
        }
    }, [messages.length]);

    useEffect(() => {
        let sessionToken : string = (parsed["sessionToken"] ?? "") as string;
        setSessionToken(sessionToken);
        getIsPlayerInRoom(sessionToken);

        function onConnect() {
            console.log('Connected to server');
        }

        function onDisconnect() {
            console.log('Disconnected from server');
        }

        function onReply(message: Message) {
            setMessages((messages) => [...messages, {...message, textToSpeechState: TextToSpeechState.DORMANT}]); 
        }

        let done = true;
        function onDMMessage(message: string) {
            if(message == DM_COMPLETION_TOKEN) {
                done = true; 
            } else {
                if(done && message.length > 0) { // new message -> new card
                    setMessages((messages) => [...messages, {userToken: 'DM', content: "" + message, textToSpeechState: TextToSpeechState.DORMANT} as Message]);
                    done = false;
                } else if(message.length > 0) { // append to existing message
                    setMessages((messages) => [...messages.slice(0, messages.length-1), 
                            {userToken: 'DM', content: messages[messages.length-1].content + message, textToSpeechState: TextToSpeechState.DORMANT} as Message]); 
                }
            }
        }

        function onNewGame(sessionToken: string, userTokenToCharacterName: Object) { 
            setSessionToken(sessionToken);
            setUserTokenToCharacterName(new Map(Object.entries(userTokenToCharacterName)));
            session_token = sessionToken;

            // update the URL
            window.history.replaceState({}, '', window.location.pathname + `?sessionToken=${sessionToken}`);
        }

        function onJoinGame(previousMessages: Message[], userTokenToCharacterName: Object) {
            setUserTokenToCharacterName(new Map(Object.entries(userTokenToCharacterName)));

            previousMessages.reverse().forEach((message) => {
                setMessages((messages) => [...messages, {...message, textToSpeechState: TextToSpeechState.DORMANT}]); 
            });
        }

        function onConnectErr(err: any) {
            console.log(`connect_error due to ${err.message}`); 
        }

        function onTTS(data: any) {
            const source = audioContext.createBufferSource();
            setSource(source);

            audioContext.decodeAudioData(data, (buffer) => {
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start();

                source.onended = () => {
                    setIsAudioPlaying(false);
                    // set the textToSpeechState to DORMANT
                    setMessages((messages) => {
                        const newMessages = [...messages];
                        newMessages.forEach((message, index) => {
                            if (message.textToSpeechState === TextToSpeechState.PLAYING) {
                                newMessages[index] = {...newMessages[index], textToSpeechState: TextToSpeechState.DORMANT};
                            }
                        });
                        return newMessages;
                    });
                }
            });

            // set the textToSpeechState to PLAYING where it was LOADING
            setMessages((messages) => {
                const newMessages = [...messages];
                newMessages.forEach((message, index) => {
                    if (message.textToSpeechState === TextToSpeechState.LOADING) {
                        newMessages[index] = {...newMessages[index], textToSpeechState: TextToSpeechState.PLAYING};
                    }
                });
                return newMessages;
            });
        }

        function onUpdatePlayerList(newUserTokenToCharacterName: Object) {
            setUserTokenToCharacterName(new Map(Object.entries(newUserTokenToCharacterName)));
        }

        socket.connect();

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('reply', onReply);
        socket.on('DMessage', onDMMessage);
        socket.on('newGame', onNewGame);
        socket.on('joinGame', onJoinGame);
        socket.on('connect_error', onConnectErr);
        socket.on('tts', onTTS);
        socket.on('updatePlayerList', onUpdatePlayerList);

        return () => {
            socket.close();
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission and update outputText
        // use websockets to send inputText to server
        socket.emit('reply', inputText, sessionToken);
        setInputText('');
    };

    const handleTTSRequest = (text: string, index: number) => {
        setIsAudioPlaying(true);
        // use websockets to send inputText to server
        socket.emit('tts', text, sessionToken, playbackSpeed ?? 1);
        // set the textToSpeechState to LOADING
        setMessages((messages) => {
            const newMessages = [...messages];
            newMessages[index] = {...newMessages[index], textToSpeechState: TextToSpeechState.LOADING};
            return newMessages;
        });
    };

    const handleTTSStop = () => {
        source.stop();
        // set the textToSpeechState to DORMANT
        setMessages((messages) => {
            const newMessages = [...messages];
            newMessages.forEach((message, index) => {
                if (message.textToSpeechState === TextToSpeechState.PLAYING) {
                    newMessages[index] = {...newMessages[index], textToSpeechState: TextToSpeechState.DORMANT};
                }
            });
            return newMessages;
        });

        setIsAudioPlaying(false);
    }


    function createNewGame(name : string = "", description : string = "", character: Character) {    
        socket.emit('newGame', character, name, description);
    };

    const handleJoinGame = (token: string, character?: Character) => {
        setSessionToken(token);
        socket.emit('joinGame', token, character);
    };

    const handleVoiceInput = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
    
        recognition.start();
    
        recognition.addEventListener('result', (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        });
    
        recognition.addEventListener('error', (event: any) => {
            console.error('Error occurred in recognition:', event.error);
        });
        } else {
        alert('SpeechRecognition not supported in your browser. Please use the latest version of Chrome or Firefox.');
        }
    };

    return (
        <Stack direction="column" justifyContent="center" sx={{position: "relative"}}>
        <Sheet sx={{
            height: "100vh", display: "flex", flexDirection: "column", width: "1400px", alignSelf: "center",
            [theme.breakpoints.down('lg')]: {
                width: "95vw",
            },
            [theme.breakpoints.down('md')]: {
                width: "95vw",
            },
            [theme.breakpoints.down('sm')]: {
                width: "95vw",
            },
            }}>
        <DashboardNavbar sessionToken={sessionToken} />
        <Stack ref={messageStackRef} sx={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px", paddingTop: "64px", paddingBottom: "128px", overflowY: "auto", marginTop: "40px"}}>
            <Spacer direction="vertical" size="16px" />
            {messages.map((message, index) => (
                message.userToken === 'DM' ?
                <DungeonMasterMessage isAudioPlaying={isAudioPlaying} handleTTSRequest={(content) => handleTTSRequest(content, index)} handleTTSStop={handleTTSStop} key={index} message={message} /> :
                <MessageCard isAudioPlaying={isAudioPlaying} handleTTSRequest={(content) => handleTTSRequest(content, index)} handleTTSStop={handleTTSStop} key={index} alignment={message.userToken === user?.userToken ? 'right' : 'left'} name={userTokenToCharacterName.get(message.userToken) || "DM"} message={message} />
            ))}
        </Stack>
        <Box sx={{ position: "fixed", zIndex: 100, width: "1000px", bottom: 0, right: 0, left: 0, display: "flex", justifyContent: "flex-end", gap: "8px", padding: "0 16px", marginBottom: "16px", boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down('lg')]: {
            width: "700px",
        },
        [theme.breakpoints.down('md')]: {
            width: "500px",
        },
        [theme.breakpoints.down('sm')]: {
            width: "300px",
        }
    }}>
            <Textarea
                size="sm"
                placeholder="Enter your next move"
                value={inputText}
                onChange={handleInputChange}
                sx={{ flex: "1", position: "relative", paddingLeft: "56px", paddingRight: "56px"}}
                maxRows={5}
                endDecorator={
                <Stack>
                    <Button variant="plain" color="neutral" type="button" onClick={handleVoiceInput} sx={{position: "absolute", left: 0, top: 0, bottom: 0}}><Mic /></Button>
                    
                </Stack>}
                startDecorator={
                    <Button variant="plain" color="neutral" type="button" onClick={handleSubmit} sx={{position: "absolute", right: 0, top: 0, bottom: 0}}><Send /></Button>
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                        // stop the event from propagating
                        e.preventDefault();
                    }
                }}
            />
        </Box>
        <Box sx={{ position: "fixed", zIndex: 100, bottom: 0, right:0, display: "flex", justifyContent: "flex-end", gap: "8px", padding: "0 16px", marginBottom: "16px", boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    }}>
            <FormControl>
                <FormLabel>Speech Speed</FormLabel>
                <Input sx={{width: "100px"}} placeholder="1x" onChange={(e) => {
                    setPlaybackSpeed(parseFloat(e.target.value))
                }} />
            </FormControl>
        </Box>
        <CreateCharacterModal showModal={state === CampaignState.CREATE_CHARACTER} startGame={startGameWithCharacter} setGameState={setState} />
    </Sheet>
    </Stack>
    );
};

export default CampaignPage;

