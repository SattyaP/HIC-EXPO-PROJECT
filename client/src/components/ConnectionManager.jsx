import React from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <div className='d-flex gap-2'>
            <button className='btn btn-primary' onClick={connect}>Connect</button>
            <button className='btn btn-danger' onClick={disconnect}>Disconnect</button>
        </div>
    )
}
