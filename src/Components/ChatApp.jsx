import React, { useState, useEffect } from 'react';
import Peer from 'peerjs'
import ConnectionContext from '../service/ConnectionContext';

const ChatApp = () => {
    [context, setContext] = useState(new ConnectionContext());
    
};