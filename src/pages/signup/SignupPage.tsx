import React, { useState } from 'react';
import './SignupPage.css';
import Button from '../../components/button/Button';
import InputField from '../../components/inputField/InputField';
import Typography from '../../components/text/Typography';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';
import { postSignup } from '../../api/PostSignup';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email cannot be empty');
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };
    

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError('Password cannot be empty');
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const isFormValid = () => {
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);
        return !emailError && !passwordError && !confirmPasswordError;
    };

    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
        validateConfirmPassword(event.target.value);
    };

    const handleSignup = async () => {
        if (!isFormValid()) {
            return;
        }
        const response = await postSignup({email, password});
        console.log(response);
        if (!response.error) {
            navigate('/dashboard');
        }
    }

    return (
        <div className="login-container">
            {/* logo */}
            <Logo size={175} absolute top={0}/>
            <Spacer size={60} direction="vertical" />
            {/* login form */}
            <Typography color={Colors.WHITE} alignment="center" size={TypographySizes.XLARGE} weight="bold">Join the Adventure!</Typography>
            <Spacer size={40} direction="vertical" />
            <InputField type="email" header="Email" required onChange={handleEmailChange} error={emailError}/>
            {!emailError && <Spacer size={21} direction="vertical" />}
            <Typography color={Colors.ERROR} alignment="center" weight="bold">{emailError}</Typography>
            <Spacer size={20} direction="vertical" />
            <InputField type="password" header="Password" required onChange={handlePasswordChange} error={passwordError}/>
            {!passwordError && <Spacer size={21} direction="vertical" />}
            <Typography color={Colors.ERROR} alignment="center" weight="bold">{passwordError}</Typography>
            <Spacer size={20} direction="vertical" />
            <InputField type="password" header="Confirm Password" required onChange={handleConfirmPasswordChange} error={confirmPasswordError}/>
            {!confirmPasswordError && <Spacer size={21} direction="vertical" />}
            <Typography color={Colors.ERROR} alignment="center" weight="bold">{confirmPasswordError}</Typography>
            <Spacer size={40} direction="vertical" />
            <Button type="Primary" onClick={handleSignup}>Signup</Button>
            <Spacer size={5} direction="vertical" />
            <Typography color={Colors.GRAY} alignment="center" weight="bold">Already have an account?<Link style={{display: "inline"}} to="/login"> Login</Link></Typography>
            <Spacer size={60} direction="vertical" />
        </div>
    );
}

export default SignupPage;
