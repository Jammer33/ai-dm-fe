// a react nav header for my website

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import Spacer from '../spacer/Spacer';
import FlexBox from '../flexBox/FlexBox';

interface NavbarProps {
    // Any additional props for Navbar can be defined here
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <div className="navbar">
            <img src="logo.png" alt="Wizard GM Logo" className="navbar-logo" />
            <div className="navbar-items">
                <a href="#">About</a>
                <Link to="/pricing">Pricing</Link>
                <a href="#">Support</a>
            </div>
            <FlexBox>
                <Link to="/login"><Button type='Secondary' onDarkBackground>Login</Button></Link>
                <Spacer size={20} direction="horizontal" />
                <Link to="/signup"><Button type='Primary' onDarkBackground>Sign Up</Button></Link>
            </FlexBox>
        </div>
    );
}

export default Navbar;
