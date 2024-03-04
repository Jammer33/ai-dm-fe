// a react nav header for my website
import React, { useContext } from 'react';
import { useState } from 'react';
import './DashboardNavbar.css';
import Button from '../button/Button';
import Spacer from '../spacer/Spacer';
import FlexBox from '../flexBox/FlexBox';
import { useAuth } from '../../provider/AuthProvider';
import { Sheet, Stack, Typography, Link, Textarea } from '@mui/joy';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardNavbarProps {
    // Any additional props for Navbar can be defined here
    sessionToken?: string; // Define sessionToken prop
    handleJoinGame?: (token: string) => void;
    handleNewGame?: () => void;
}

const handleSignOut = async () => {
    //add funtionality
}

// const handleCopyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//         .then(() => {
//             console.log('Session token copied to clipboard:', text);
//         })
//         .catch((error) => {
//             console.error('Failed to copy session token to clipboard:', error);
//         });
// }

const handleCopyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Session token copied to clipboard:', text);
            // Notify user visually
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Reset the copied state after 2 seconds
        })
        .catch((error) => {
            console.error('Failed to copy session token to clipboard:', error);
        });
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ sessionToken, handleJoinGame, handleNewGame }) => {
    const [copied, setCopied] = useState<boolean>(false); // State for visual notification
    // const [username, setUsername] = useState();
    const username = useAuth().user?.username;
    console.log(useAuth());
    
    // setUsername(user);
    // const [joinToken, setJoinToken] = useState<string>(''); // State for join token
    const [joinToken, setJoinToken] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinToken(event.target.value);
    };

    const navigate = useNavigate();
    const onJoinGame = async (token: string) => {
        if (handleJoinGame) {
            handleJoinGame(token);
            return;
        }
        return navigate(`/campaign?sessionToken=${token}`);
    }

    const handleJoinButtonClick = () => {
        // if (onJoinGame && joinToken.trim() !== '') {
        //     onJoinGame(joinToken.trim());
        // }
    };


    return (
        <div className="navbar-fixed"> {/* Added a div with class "navbar-fixed" */}
        <Stack direction="row" sx={{
            backgroundColor: "background.level1",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Link href='/dashboard'><img src="logo.png" alt="Wizard GM Logo" className="navbar-logo" /></Link>
            <h3>Wizard GM</h3>
            <Stack direction="row" sx={{ marginLeft: "auto", marginRight: "20px" }}>
                <Link color="neutral" href="/dashboard">Dashboard</Link>
                <Spacer direction="horizontal" size="16px" />
                <Link color="neutral" href="/account">Account</Link>
                <Spacer direction="horizontal" size="16px" />
                {sessionToken && (
                    <Link color="neutral" onClick={() => handleCopyToClipboard(sessionToken, setCopied)}>
                        Game Token {copied && <span style={{ color: 'green', marginLeft: '5px' }}>Copied!</span>}
                    </Link>
                )}
                <Spacer direction="horizontal" size="16px" />
                <Textarea
                    size="sm"
                    placeholder="Enter join token here"
                    value={joinToken}
                    onChange={(e) => setJoinToken(e.target.value)}
                />
                <Spacer direction="horizontal" size="8px" />
                {/* <Button type="Primary" onClick={handleJoinGame}>Join Game</Button> */}
                <Button type="Primary" onClick={() => onJoinGame(joinToken)}>Join Game</Button>
                {/* <Spacer direction="horizontal" size="8px" />  */}
                {/* <button className="submit" onClick={handleNewGame} style={{ fontSize: "16px" }}>New Game</button> */}
            </Stack>
            <FlexBox>
                {/* Account username */}
                <p>{username}</p>
            </FlexBox>
            <Link href="/login" sx={{ marginLeft: "auto", marginRight: "20px" }}><Button type='Primary' onDarkBackground onClick={handleSignOut}>Sign Out</Button></Link>
            
        </Stack>
        </div>
    );
}

export default DashboardNavbar;


