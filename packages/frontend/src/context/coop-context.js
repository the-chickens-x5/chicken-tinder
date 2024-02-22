import React, { createContext } from 'react';
import { io } from 'socket.io-client';

const CoopContext = createContext({
    lastMessage: null,
    messages: [],
    connectToFlock: (flockId) => {},
 })

 export const CoopProvider = ({ children }) => {
    const [lastMessage, setLastMessage] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [socket, setSocket] = React.useState(null);

    const connectToFlock = (flockId) => {
        const newSocket = io(`${process.env.REACT_APP_API_URL}/flock/${flockId}`);
        newSocket.on('message', (message) => {
            setLastMessage(message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        setSocket(newSocket);
    }

    return (
        <CoopContext.Provider value={{ lastMessage, messages, connectToFlock }}>
            {children}
        </CoopContext.Provider>
    )
 }

export default CoopContext;