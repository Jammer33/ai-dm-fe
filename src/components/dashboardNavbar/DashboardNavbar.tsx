// a react nav header for my website
import React from 'react';
import './DashboardNavbar.css';
import Button from '../button/Button';
import Spacer from '../spacer/Spacer';
import FlexBox from '../flexBox/FlexBox';
import { useAuth } from '../../provider/AuthProvider';
import { Sheet, Stack, Typography, Link } from '@mui/joy';

interface DashboardNavbarProps {
    // Any additional props for Navbar can be defined here
}

const handleSignOut = async () => {
    //add funtionality
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = () => {
    const username = useAuth().user?.username;

    return (
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
                <Link color="neutral" href="/create-campaign">Join game</Link>
            </Stack>
            <FlexBox>
                {/* Account username */}
                <p>{username}</p>
            </FlexBox>
            <Link href="/login" sx={{ marginLeft: "auto", marginRight: "20px" }}><Button type='Primary' onDarkBackground onClick={handleSignOut}>Sign Out</Button></Link>
            
        </Stack>
    );
}

export default DashboardNavbar;
