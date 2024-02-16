import React, { useState, useEffect, useRef }  from 'react';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import MessageCard from './components/messageCard/MessageCard';
import '../../components/dashboardNavbar/DashboardNavbar.css';
import { Input, Sheet, Stack, Textarea } from '@mui/joy';
import Button from '../../components/button/Button';
import Spacer from '../../components/spacer/Spacer';
import { socket } from '../../socket';
interface Props {
    // Define props here
}

const CampaignPage: React.FC<Props> = (props) => {
    // Define component logic here
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [playerInfo, setPlayerInfo] = useState({
        name: 'Ariel',
        characterClass: 'Wizard',
        race: 'Elf',
        level: 5,
    });
    const [playerMessage, setPlayerMessage] = useState('');
    type Player = {
        name: string;
        message: string;
    }
    const [playerObj, setPlayerObj] = useState<Player[]>([{
        name: 'help-bot',
        message: 'Welcome to the chatroom! Please click on the New Game button in the Navbar above 👆 to initiate a game. 😄',
    } as Player]);

    
   

    const DM_COMPLETION_TOKEN = "[DONE]";

    let session_token = '';

    const messageStackRef = useRef<HTMLDivElement>(null);

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
        
        if(previousMessages.has("DM")) {
            let message : String = previousMessages.get("DM") ?? "";
            setOutputText(outputText => outputText + "\n" + message + "\n");
            previousMessages.delete("DM");
        }

        previousMessages.forEach((message, player) => {
            setOutputText(outputText => outputText + "\n" + player + ": " + message + "\n");
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

    const handleSessionTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSessionToken(event.target.value);
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
        socket.emit('tts', text, sessionToken);
    }

    const handleNewGame = () => {
        // use websockets to send inputText to server
        const character1 = {
        name: 'Ariel',
        race: 'Elf',
        class: 'Wizard',
        };
        const character2 = {
        name: 'James',
        race: 'Human',
        class: 'Fighter',
        };
        const character3 = {
        name: 'Connor',
        race: 'Dwarf',
        class: 'Cleric',
        };

        socket.emit('newGame', [character2]);
        setInputText('');
        setOutputText('');
    };

    // const handleJoinGame = () => {
    //     // console.log('Joining game with token:', joinToken);
    //     socket.emit('joinGame', sessionToken);

    // };

    const handleJoinGame = (token: string) => {
        // console.log('Joining game with token:', joinToken);
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
        <DashboardNavbar sessionToken={sessionToken} handleJoinGame={handleJoinGame} handleNewGame={handleNewGame}/>
        <Stack ref={messageStackRef} sx={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px", padding: "16px", overflowY: "auto", marginTop: "40px", marginBottom: "100px"}}>
            <Spacer direction="vertical" size="16px" />
            {/* <MessageCard alignment='right' name='James' messageText='Hi! Excited to begin this campaign :D' />
            <MessageCard alignment='left' name='Ariel' messageText='Yeah me too! Thanks so much for putting this website together. This should be a lot of fun' />
            <MessageCard alignment='left' name='DM' messageText='test DM' /> */}
            {playerObj.map((messageObj, index) => (
                <MessageCard handleTTSRequest={handleTTSRequest} key={index} alignment={messageObj.name === 'DM' ? 'left' : 'right'} name={messageObj.name} messageText={messageObj.message} />
            ))}
        </Stack>
        {/* <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "0 16px", marginBottom: "16px"  }}> */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "flex-end", gap: "8px", padding: "0 16px", marginBottom: "16px", backgroundColor: "black", boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)" }}>
            {/* <button className="submit" onClick={handleNewGame}>New Game</button> */}
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
                {/* <button className="submit" onClick={handleNewGame}>New Game</button> */}
                <Button type='Secondary' onDarkBackground onClick={handleVoiceInput}>Voice Input</Button>
                {/* <button className="submit" onClick={handleVoiceInput}>Voice Input</button> */}
                {/* <input
                    type='text'
                    value={sessionToken}
                    onChange={handleSessionTokenChange}
                    placeholder="Enter session token here"
                    style={{
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "1px solid #555",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        outline: "none",
                        transition: "background-color 0.3s ease",
                        fontSize: "18px", 
                    }}
                ></input> */}
                {/* <button className="submit" onClick={handleJoinGame}>Join Game</button> */}

            </div>
        </div>
    </Sheet>
    );
};

export default CampaignPage;

