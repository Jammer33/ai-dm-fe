import React from 'react';

import './SignupCTA.css';
import Button from '../../../../components/button/Button';

const SignupCTA: React.FC = () => {
    return (
        <div className="signup-cta-container">
            <img src="/logo.png" alt="Wizard GM Logo" className="cta-logo" />
            <h1>Start Your Adventure Today</h1>
            <Button type="Primary" size='Large'>Signup now</Button>
        </div>
    );
}

export default SignupCTA;
