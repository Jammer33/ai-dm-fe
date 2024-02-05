import React, { useState, useEffect }  from 'react';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import MessageCard from './components/messageCard/MessageCard';
import '../../components/dashboardNavbar/DashboardNavbar.css';
import { Input, Sheet, Stack, Textarea } from '@mui/joy';
import Button from '../../components/button/Button';
import Spacer from '../../components/spacer/Spacer';
import { socket } from '../../socket';
import { log } from 'console';


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
    const [playerObj, setPlayerObj] = useState([{
        name: 'Ariel',
        message: 'Wizard',
    }]);
    const DM_COMPLETION_TOKEN = "[DONE]";

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

        let totalMessage = "";
        function onDMMessage(message: string) {
            // console.log(message);
            if(message == DM_COMPLETION_TOKEN) {
                setPlayerObj((playerObj) => [...playerObj, {name: 'DM', message: ""+totalMessage}]);
                setOutputText(outputText => outputText + message);
                console.log("dm completion token recieved");
                totalMessage = ""; // reset the total message when the entire message has been sent
            } else {
                if(totalMessage.length == 0) { // if the total message is empty, then this is the start of a new message
                    // setPlayerObj((playerObj) => [...playerObj, {name: 'DM', message: ""+message}]);
                    // setOutputText(outputText => outputText + message);
                    totalMessage = message;
                } else {
                    totalMessage += message;
                    // console.log(totalMessage);
                    
                    // setPlayerObj((playerObj) => [...playerObj.slice(0, playerObj.length-1), {name: 'DM', message: ""+totalMessage}]);
                    // setOutputText(outputText => outputText + message);
                }
            }
            //console.log(playerObj);
            
        }

        function onNewGame(sessionToken: string) { 
            console.log(sessionToken);
            setSessionToken(sessionToken);
        }

        function onJoinGame(previousMessagesStr: string) {
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

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('reply', onReply);
        socket.on('DMessage', onDMMessage);
        socket.on('newGame', onNewGame);
        socket.on('joinGame', onJoinGame);
        socket.on('connect_error', onConnectErr);

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

    const handleJoinGame = () => {
        socket.emit('joinGame', sessionToken);
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
        <Sheet sx={{ minHeight: "100VH" }}>
    <DashboardNavbar />
    <Stack sx={{ margin: "0 300px" }}>
        <Spacer direction="vertical" size="16px" />
        <MessageCard alignment='right' name='James' messageText='Hi! Excited to begin this campaign :D' />
        <MessageCard alignment='left' name='Ariel' messageText='Yeah me too! Thanks so much for putting this website together. This should be a lot of fun' />
        <MessageCard alignment='left' name='DM' messageText='test DM' />
        {playerObj.map((messageObj, index) => (
            <MessageCard key={index} alignment={messageObj.name === 'DM' ? 'left' : 'right'} name={messageObj.name} messageText={messageObj.message} />
        ))}
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                padding: "0 16px",
                position: "fixed",
                bottom: "16px",
                left: "100px",
                right: "100px",
            }}
        >
            <Textarea
                size="sm"
                placeholder="Enter your next move"
                value={inputText}
                onChange={handleInputChange}
                sx={{ flex: "1" }}
                maxRows={5}
            />
            <Button type='Primary' onDarkBackground onClick={handleSubmit}>send</Button>
            <button className="submit" onClick={handleNewGame}>New Game</button>
            <button className="submit" onClick={handleVoiceInput}>Voice Input</button>
        </div>
    </Stack>
</Sheet>

    );
};

export default CampaignPage;

