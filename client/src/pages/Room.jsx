import { useEffect, useState } from 'react';
import { Socket } from '../socket';
import { generateUsername } from 'unique-username-generator';

export default function Room() {
    const [player, setPlayer] = useState([]);
    const [room, setRoom] = useState('');

    useEffect(() => {
        const name = generateUsername();
        const socket = new Socket();
        setPlayer([name, socket.getId()]);
        setRoom(socket.getRoomId());
    }, [setPlayer]);

    return (
        <div className="text-white">
            <h1>{player}</h1>
            <h1>{room}</h1>
        </div>
    );
}
