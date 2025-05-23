import React, { Fragment } from 'react';
import './ForgotPassword.css';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';
import { postSendEmail } from '../../api/PostSendEmail';
import { Alert, Button, Card, FormControl, FormLabel, Input, Sheet, useTheme } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSendEmail = async () => {
        postSendEmail({email});
        alert('Email submitted successfully. Check your inbox!');
        navigate('/login');
    }

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
                width: "320px",
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
            {/* logo */}
            <Logo size={175} absolute top={-0}/>
            <Spacer size={40} direction="vertical" />
            {/* login form */}
            <Typography alignSelf="center" level="h2">Password amnesia?</Typography>
            <Spacer size={20} direction="vertical" />
            <FormControl error={!!error}>
                <FormLabel>Email</FormLabel>
                <Input type="email" onChange={handleEmailChange} />
            </FormControl>
            {!!error && <Alert sx={{ backgroundColor: "background.level1", padding: "4px 0" }} size="sm" color="danger" variant="plain"><InfoOutlined /> {error}</Alert>}
            <Spacer size={20} direction="vertical" />

            <Button type="submit" onClick={handleSendEmail}>Submit</Button>
            
            <Spacer size={4} direction="vertical" />
            <Typography level="body-sm">Don't have an account?<Link style={{display: "inline"}} to="/signup"> Signup</Link></Typography>
            
            <Spacer size={40} direction="vertical" />

        </Card>
        
        </Sheet>
    );
}

export default ForgotPasswordPage;
