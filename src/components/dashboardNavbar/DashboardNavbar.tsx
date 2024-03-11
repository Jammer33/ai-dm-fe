// a react nav header for my website
import React, { useContext, useEffect } from 'react';
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

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ sessionToken }) => {
    const [copied, setCopied] = useState<boolean>(false); // State for visual notification
    const [username, setUsername] = useState<string|null>();
    const auth = useAuth();
    
    useEffect(() => {
        setUsername(auth.user?.username);
    }, [auth]);

    const navigate = useNavigate();

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
                {/* <Link color="neutral" href="/account">Account</Link> */}
                <Spacer direction="horizontal" size="16px" />
                {sessionToken && (
                    <Link color="neutral" onClick={() => handleCopyToClipboard(sessionToken, setCopied)}>
                        Game Token {copied && <span style={{ color: 'green', marginLeft: '5px' }}>Copied!</span>}
                    </Link>
                )}
                <Spacer direction="horizontal" size="16px" />
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


