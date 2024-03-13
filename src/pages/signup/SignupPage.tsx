import React from 'react';
import './SignupPage.css';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';
import { useGoogleLogin } from "@react-oauth/google";
import { postSignup } from '../../api/PostSignup';
import { Alert, Button, Card, FormControl, FormLabel, Input, Sheet, useTheme } from '@mui/joy';
import GoogleIcon from '../../components/googleIcon/GoogleIcon';
import { useAuth } from '../../provider/AuthProvider';
import { postGoogleAuthLogin } from '../../api/PostLogin';

const SignupPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const [emailInUserError, setEmailInUserError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const theme = useTheme();

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse: { access_token: string; }) =>
          handleGoogleAuthSuccess(codeResponse.access_token),
        onError: () => handleGoogleAuthFailure(),
      });

    const { login } = useAuth();

    const handleGoogleAuthSuccess = async (access_token: string) => {
    try {
        const response = await postGoogleAuthLogin({ access_token });

        if (!response.error) {
        const username = response.email.split("@")[0];
        login({ email, username, userToken: response.userToken });
        navigate("/dashboard");
        }
    } catch (error) {
        setEmailError("Google Sign In failed");
    }
    };

    const handleGoogleAuthFailure = () => {
        setEmailError("Google Sign In failed");
    };

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

        setIsLoading(true);

        try {
            const response = await postSignup({ email, password });
            if (!response.error) {
                navigate('/login');
            }
        } catch (error) {
            setEmailInUserError("This email is already in use");
            setIsLoading(false);
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

                <Button loading={isLoading} type="submit" onClick={handleSignup}><Typography level="title-sm">Signup</Typography></Button>
                <Spacer size={16} direction="vertical" />
                <Button color="neutral" startDecorator={<GoogleIcon />} onClick={() => googleLogin()}>
                    <Typography level="title-sm">Signup with Google</Typography>
                </Button>
                <Spacer size={4} direction="vertical" />
                <Typography level="body-sm">Already have an account?<Link style={{display: "inline"}} to="/login"> Login</Link></Typography>
                <Spacer size={40} direction="vertical" />

            </Card>
        </Sheet>
    );
}

export default SignupPage;
