// a react nav header for my website

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import Spacer from '../spacer/Spacer';
import FlexBox from '../flexBox/FlexBox';
import { Box, Sheet } from '@mui/joy';

interface NavbarProps {
    // Any additional props for Navbar can be defined here
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <Sheet sx={{
            position: "sticky",
            top: "0",
            left: "0",
            width: "100%",
            height: "60px",
            zIndex: "100",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 20px",
            boxSizing: "border-box",
        }}>
            <Link to='/'><img src="logo.png" alt="Wizard GM Logo" className="navbar-logo" /></Link>
            <Box className="navbar-items">
            </Box>
            <FlexBox>
                <Link to="/login"><Button type='Secondary' onDarkBackground>Login</Button></Link>
                <Spacer size={20} direction="horizontal" />
                <Link to="/signup"><Button type='Primary' onDarkBackground>Sign Up</Button></Link>
            </FlexBox>
        </Sheet>
    );
}

export default Navbar;
