import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const CoopContext = createContext({
    lastMessage: null,
    messages: [],
    connectToFlock: (flockId) => {},
 })

 export const CoopProvider = ({ children }) => {
    const [lastMessage, setLastMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const connectToFlock = (flockId) => {
        const newSocket = io(`${process.env.REACT_APP_API_URL}`);
        newSocket.emit('join-flock', flockId);
        setSocket(newSocket);
    }

    useEffect(() => {
        if (socket) {
            socket.on('message', (message) => {
                console.log('Received message', message);
                setLastMessage(message);
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [socket]);

    return (
        <CoopContext.Provider value={{ lastMessage, messages, connectToFlock }}>
            {children}
        </CoopContext.Provider>
    )
 }

export default CoopContext;