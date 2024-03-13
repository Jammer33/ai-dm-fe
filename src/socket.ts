import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SOCKET_HOST || 'wss://localhost:3001';

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false,
});

// cookies are not being sent to the server over the socket