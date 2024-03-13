import React from 'react';

import './SignupCTA.css';
import Button from '../../../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const SignupCTA: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-cta-container">
            <img src="/logo.png" alt="Wizard GM Logo" className="cta-logo" />
            <h1>Start Your Adventure Today</h1>
            <Button type="Primary" size='Large' onClick={() => {navigate("/signup")}}>Sign Up Now</Button>
        </div>
    );
}

export default SignupCTA;
