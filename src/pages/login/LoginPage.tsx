import React from 'react';
import './LoginPage.css';
import Button from '../../components/button/Button';
import InputField from '../../components/inputField/InputField';
import Typography from '../../components/text/Typography';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import Spacer from '../../components/spacer/Spacer';

const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        
    }

    

    return (
        <div className="login-container">
            {/* logo */}
            <Logo size={175} absolute top={0}/>
            <Spacer size={60} direction="vertical" />
            {/* login form */}
            <Typography color={Colors.WHITE} alignment="center" size={TypographySizes.XLARGE} weight="bold">Welcome Back</Typography>

            <Spacer size={40} direction="vertical" />
            <InputField type="email" header="Email" required onChange={handleEmailChange}/>

            <Spacer size={20} direction="vertical" />
            <InputField type="password" header="Password" required onChange={handlePasswordChange}/>

            <Link to="/forgot-password">Forgot your password?</Link>
            <Spacer size={60} direction="vertical" />
            
            <Button type="Primary" onClick={handleLogin}>Login</Button>
            <Typography color={Colors.GRAY} weight="bold">Don't have an account?<Link style={{display: "inline"}} to="/signup"> Signup now</Link></Typography>
            <Spacer size={60} direction="vertical" />
        </div>
    );
}

export default LoginPage;
