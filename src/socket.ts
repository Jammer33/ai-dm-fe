import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SOCKET_HOST || 'wss://localhost:3001';

export const socket = io(URL, {
    withCredentials: true,
});

// cookies are not being sent to the server over the socket