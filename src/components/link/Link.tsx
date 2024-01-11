import { Typography } from '@mui/joy';
import React from 'react';
import { Link } from 'react-router-dom';

interface LinkProps {
    href: string;
    text: string;
}

const LinkTypography: React.FC<LinkProps> = ({ href, text }) => {
    return (
        <Link to="/forgot-password"><Typography level="body-sm" color="primary">Forgot Password?</Typography></Link>
    );
};

export default LinkTypography;
