import React, { useState, useEffect, useRef }  from 'react';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import MessageCard from './components/messageCard/MessageCard';
import '../../components/dashboardNavbar/DashboardNavbar.css';
import { Box, FormControl, FormLabel, Input, Sheet, Stack, Textarea } from '@mui/joy';
import Button from '../../components/button/Button';
import Spacer from '../../components/spacer/Spacer';
import { socket } from '../../socket';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import CreateCharacterModal from './components/CreateCharacterModal';

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
    alignment: string;
    background: string;
}
    


const CampaignPage: React.FC<Props> = (props) => {
    // Define component logic here
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [playerMessage, setPlayerMessage] = useState('');
    const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>({
        title: '',
        description: '',
    });
    const [state, setState] = useState<CampaignState>(CampaignState.UNKNOWN);

    type Player = {
        name: string;
        message: string;
    }
    const [playerObj, setPlayerObj] = useState<Player[]>([{
        name: 'help-bot',
        message: 'Welcome to the chatroom! Please click on the New Game button in the Navbar above 👆 to initiate a game. 😄',
    } as Player]);

    const DM_COMPLETION_TOKEN = "[DONE]";
    const parsed = queryString.parse(useLocation().search);
    const messageStackRef = useRef<HTMLDivElement>(null);

    const location = useLocation();

    let session_token = '';

    const startGameWithCharacter = (character: Character) => {
        if (location.state.title) {
            // create a new game
            createNewGame(campaignInfo.title, campaignInfo.description, character);
        } else {
            // join an existing game with new character
            handleJoinGame(sessionToken);
        }
    }

    useEffect(() => {
        // Scroll to the bottom of the message stack when it updates
        if (messageStackRef.current) {
            messageStackRef.current.scrollTop = messageStackRef.current.scrollHeight;
        }
    }, [playerObj]);

    useEffect(() => {
        console.log(document);
        console.log('CampaignPage mounted');
        console.log('socket:', socket);

        const paramsStr = queryString.stringify(parsed);
        if(paramsStr.length != 0) { // query params indicate that we want to join a room
            let sessionToken : string = (parsed["sessionToken"] ?? "") as string;

            if(sessionToken.length > 0) {
                handleJoinGame(sessionToken);
            }
        } else {
            // we are creating a new campaign
            setCampaignInfo({
                title: location.state.title,
                description: location.state.description,
            });
            setState(CampaignState.CREATE_CHARACTER);
        }
        
        function onConnect() {
            console.log('Connected to server');
        }

        function onDisconnect() {
            console.log('Disconnected from server');
        }

        function onReply(message: string) {
            console.log(message);
            let formattedObj = new Map<String, String>(JSON.parse(message));
            
            console.log(formattedObj);
            let player = "";
            
            if(formattedObj.has("player")) {
                let player1 = formattedObj.get("player") ?? "";
                player = String(player1);
                setOutputText(outputText => outputText + "\n" + player + "\n");
            }
            
            if(formattedObj.has("message")) {
                let playerMessage = formattedObj.get("message") ?? "";
                // console.log("Player message ---> " + playerMessage);

                setPlayerObj((playerObj) => [...playerObj, {name: player, message: String(playerMessage)}]); 
                console.log(playerObj);
                setOutputText(outputText => outputText + "\n" + playerMessage + "\n");
            }
        }

        let done = true;
        function onDMMessage(message: string) {
            if(message == DM_COMPLETION_TOKEN) {
                console.log("dm completion token recieved");
                done = true; 
            } else {
                if(done && message.length > 0) { // new message -> new card
                    setPlayerObj((playerObj) => [...playerObj, {name: 'DM', message: "" + message} as Player]);
                    done = false;
                } else if(message.length > 0) { // append to existing message
                    setPlayerObj((prevPlayerObj) => [...prevPlayerObj.slice(0, prevPlayerObj.length-1), 
                            {name: 'DM', message: prevPlayerObj[prevPlayerObj.length-1].message + message} as Player]); 
                }
            }
        }

        function onNewGame(sessionToken: string) { 
            console.log(sessionToken);
            setSessionToken(sessionToken);
            session_token = sessionToken;
        }

        function onJoinGame(previousMessagesStr: string) {
            console.log("Join game triggered!!!");
            var previousMessages = new Map<String, String>(JSON.parse(previousMessagesStr));
            previousMessages.forEach((message, player) => {
                setPlayerObj((playerObj) => [...playerObj, {name: player, message: String(message)} as Player]); 
                // setOutputText(outputText => outputText + "\n" + player + ": " + message + "\n");
            });
        }

        function onConnectErr(err: any) {
            console.log(`connect_error due to ${err.message}`); 
        }

        function onTTS(data: any) {
            const audioContext = new window.AudioContext();
            const source = audioContext.createBufferSource();
            audioContext.decodeAudioData(data, (buffer) => {
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start();
            });
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('reply', onReply);
        socket.on('DMessage', onDMMessage);
        socket.on('newGame', onNewGame);
        socket.on('joinGame', onJoinGame);
        socket.on('connect_error', onConnectErr);
        socket.on('tts', onTTS);

        return () => {
            socket.close();
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission and update outputText
        console.log(inputText);
        // use websockets to send inputText to server
        socket.emit('reply', inputText, sessionToken);
        setInputText('');
    };

    const handleTTSRequest = (text: string) => {
        // use websockets to send inputText to server
        socket.emit('tts', text, sessionToken, playbackSpeed ?? 1);
    };

    function createNewGame(name : string = "", description : string = "", character: Character) {    
        socket.emit('newGame', [character], name, description);
    };

    const handleJoinGame = (token: string) => {
        setSessionToken(token);
        socket.emit('joinGame', token);
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

        <Sheet sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <DashboardNavbar sessionToken={sessionToken} />
        <Stack ref={messageStackRef} sx={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px", padding: "16px", overflowY: "auto", marginTop: "40px", marginBottom: "100px"}}>
            <Spacer direction="vertical" size="16px" />
            {playerObj.map((messageObj, index) => (
                <MessageCard handleTTSRequest={handleTTSRequest} key={index} alignment={messageObj.name === 'DM' ? 'left' : 'right'} name={messageObj.name} messageText={messageObj.message} />
            ))}
        </Stack>
        <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "flex-end", gap: "8px", padding: "0 16px", marginBottom: "16px", boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)" }}>
            <Textarea
                size="sm"
                placeholder="Enter your next move"
                value={inputText}
                onChange={handleInputChange}
                sx={{ flex: "1", position: "relative", zIndex: 1 }}
                maxRows={5}
            />
            <div style={{ display: "flex", gap: "8px" }}>
                <Button type='Primary' onDarkBackground onClick={handleSubmit}>Send</Button>
                <Button type='Secondary' onDarkBackground onClick={handleVoiceInput}>Voice Input</Button>
            </div>
            <FormControl>
                <FormLabel>Speech Speed</FormLabel>
                <Input placeholder="1x" onChange={(e) => {
                    setPlaybackSpeed(parseFloat(e.target.value))
                }} />
            </FormControl>
        </Box>
        <CreateCharacterModal showModal={state === CampaignState.CREATE_CHARACTER} startGame={startGameWithCharacter} setGameState={setState} />
    </Sheet>
    );
};

export default CampaignPage;

