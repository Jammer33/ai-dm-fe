// a react nav header for my website
import React from 'react';
import './DashboardNavbar.css';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import Spacer from '../spacer/Spacer';
import FlexBox from '../flexBox/FlexBox';
import { useAuth } from '../../provider/AuthProvider';

interface DashboardNavbarProps {
    // Any additional props for Navbar can be defined here
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = () => {
    const username = useAuth().user?.username;

    return (
        <div className="navbar">
            <Link to='/dashboard'><img src="logo.png" alt="Wizard GM Logo" className="navbar-logo" /></Link>
            <div className="navbar-items">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/account">Account</Link>
                
            </div>
            <FlexBox>
                {/* Account username */}
                <p>{username}</p>
            </FlexBox>
        </div>
    );
}

export default DashboardNavbar;
