import React from 'react';
import './SignupPage.css';
import Button from '../../components/button/Button';
import InputField from '../../components/inputField/InputField';
import Typography from '../../components/text/Typography';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';

const SignupPage: React.FC = () => {
    return (
        <div className="login-container">
            {/* logo */}
            <Logo size={175} absolute top={0}/>
            <Spacer size={60} direction="vertical" />
            {/* login form */}
            <Typography color={Colors.WHITE} alignment="center" size={TypographySizes.XLARGE} weight="bold">Join the Adventure!</Typography>
            <Spacer size={40} direction="vertical" />
            <InputField type="email" header="Email" required/>
            <Spacer size={20} direction="vertical" />
            <InputField type="password" header="Password" required/>
            <Spacer size={5} direction="vertical" />
            <InputField type="password" header="Confirm Password" required/>
            <Spacer size={60} direction="vertical" />
            
            <Button type="Primary">Signup</Button>
            <Typography color={Colors.GRAY} weight="bold">Already have an account?<Link style={{display: "inline"}} to="/login"> Login</Link></Typography>
            <Spacer size={60} direction="vertical" />
        </div>
    );
}

export default SignupPage;
