import React from 'react';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';
import { postResetPassword } from '../../api/PostResetPassword';
import { Alert, Button, Card, FormControl, FormLabel, Input, Sheet, useTheme } from '@mui/joy';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
    // const [passwordResetError, setpasswordResetError] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const navigate = useNavigate();
    const theme = useTheme();

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

    const handleSubmit = async () => {
        setSubmitted(true);
        const passwordValidation = validatePassword(password);
        const confirmPasswordValidation = validateConfirmPassword(confirmPassword);

        if (!(passwordValidation && confirmPasswordValidation)) {
            return;
        }

        try {
            const response = await postResetPassword({ password });
            if (!response.error) {
                navigate('/login');
            }
        } catch (error) {
            //not sure which other variable to set. TBA!
            setConfirmPasswordError("Password could not be reset. Try again later!");
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
                    width: "450px",
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
                <Typography alignSelf="center" level="h2">Time for a password makeover!</Typography>
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

                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                <Spacer size={40} direction="vertical" />

            </Card>
        </Sheet>
    );
}

export default ResetPasswordPage;
