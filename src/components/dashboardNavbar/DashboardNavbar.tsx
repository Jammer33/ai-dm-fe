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

const DashboardNavbar: React.FC<DashboardNavbarProps> = () => {
    const username = useAuth().user?.username;

    return (
        <Stack direction="row" sx={{
            backgroundColor: "background.level1",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Link href='/dashboard'><img src="logo.png" alt="Wizard GM Logo" className="navbar-logo" /></Link>
            <Stack direction="row" sx={{marginLeft: "-90px"}}>
                <Link color="neutral" href="/dashboard">Dashboard</Link>
                <Spacer direction="horizontal" size="16px" />
                <Link color="neutral" href="/account">Account</Link>
            </Stack>
            <FlexBox>
                {/* Account username */}
                <p>{username}</p>
            </FlexBox>
        </Stack>
    );
}

export default DashboardNavbar;
