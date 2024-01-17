import React from 'react';
import './Hero.css';
import { Sheet, Typography } from '@mui/joy';
import Spacer from '../spacer/Spacer';
import Logo from '../Logo';

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <Sheet sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            padding: "0 20px",
        }}>
            <img src="logo.png" alt="Wizard GM Logo" className="hero-logo" />
            <Typography level="h2">{title}</Typography>
            <Spacer direction="vertical" size="20px" />
            <Typography level="body-md" sx={{maxWidth: "500px"}}>{subtitle}</Typography>
        </Sheet>
    );
}

export default Hero;
