import React from 'react';
import './SignupPage.css';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';
import { postSignup } from '../../api/PostSignup';
import { Alert, Button, Card, FormControl, FormLabel, Input, Sheet, useTheme } from '@mui/joy';

const SignupPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const [emailInUserError, setEmailInUserError] = React.useState('');

    const navigate = useNavigate();
    const theme = useTheme();

    const validateEmail = (email: string) => {
        setEmailInUserError('');
        if (email.length === 0) {
            setEmailError('Please enter an email');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }
        setPasswordError('');

        if (confirmPassword.length > 0 && confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handleInputChange = (setter: any, validator: any) => (event: any) => {
        setter(event.target.value);
        if (submitted) {
            validator(event.target.value);
        }
    };

    const handleSignup = async () => {
        setSubmitted(true);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        const confirmPasswordValidation = validateConfirmPassword(confirmPassword);

        if (!(emailValidation && passwordValidation && confirmPasswordValidation)) {
            return;
        }

        try {
            const response = await postSignup({ email, password });
            if (!response.error) {
                navigate('/login');
            }
        } catch (error) {
            setEmailInUserError("This email is already in use");
        }
    };

    return (
        <Sheet 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Card
                size="lg"
                sx={{
                    width: "350px",
                    maxHeight: "70%",
                    margin: "0 20px",
                    gap: 0,
                    justifyContent: "center",
                    [theme.breakpoints.down('lg')]: {
                        width: "280px",
                        
                    },
                    [theme.breakpoints.down('md')]: {
                        width: "260px",
                        margin: "0",
                    },
                }}
                variant="soft"
            >
                <Logo size={175} absolute top={-0}/>
                <Spacer size={40} direction="vertical" />
                <Typography alignSelf="center" level="h2">Join the Adventure!</Typography>
                <Spacer size={20} direction="vertical" />
                <FormControl error={!!emailError}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={handleInputChange(setEmail, validateEmail)} />
                    {submitted && emailError && <Alert sx={{ backgroundColor: "background.level1", padding: "4px 0" }} variant="plain" color="danger" size="sm">{emailError}</Alert>}
                    {submitted && emailInUserError && <Alert sx={{ backgroundColor: "background.level1", padding: "4px 0" }} variant="plain" color="danger" size="sm">{emailInUserError}</Alert>}
                </FormControl>
                <Spacer size={20} direction="vertical" />

                <FormControl error={!!passwordError}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={handleInputChange(setPassword, validatePassword)} />
                    {submitted && passwordError && <Alert sx={{ backgroundColor: "background.level1", padding: "4px 0" }} variant="plain" color="danger" size="sm">{passwordError}</Alert>}
                </FormControl>
                <Spacer size={20} direction="vertical" />

                <FormControl error={!!confirmPasswordError}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" value={confirmPassword} onChange={handleInputChange(setConfirmPassword, validateConfirmPassword)} />
                    {submitted && confirmPasswordError && <Alert sx={{ backgroundColor: "background.level1", padding: "4px 0" }} variant="plain" color="danger" size="sm">{confirmPasswordError}</Alert>}
                </FormControl>
                <Spacer size={40} direction="vertical" />

                <Button type="submit" onClick={handleSignup}>Signup</Button>
                <Spacer size={4} direction="vertical" />
                <Typography level="body-sm">Already have an account?<Link style={{display: "inline"}} to="/login"> Login</Link></Typography>
                <Spacer size={40} direction="vertical" />

            </Card>
        </Sheet>
    );
}

export default SignupPage;
