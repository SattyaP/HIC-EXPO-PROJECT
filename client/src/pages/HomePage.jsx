import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from '../socket';

const baseUrl = 'http://localhost:3000';

export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', setIsLoaded(true));
        return () => {
            document.removeEventListener('DOMContentLoaded', setIsLoaded(true));
        };
    }, []);

    if (isLoaded) {
        document.getElementById('input-room').focus();
    }

    const createPrivateRoom = async () => {
        const response = await fetch(`${baseUrl}/create-room`);
        const data = await response.json();
        const socket = new Socket();
        navigate(`/room/${data.roomId}`);
        socket.joinRoom(data.roomId);
    };

    return (
        <div className="flex items-center flex-col justify-center h-screen py-12">
            <img className="w-[480px] mb-20" src="./logos.png" alt="logos_game" />

            <div className="flex-col flex mt-6">
                <label htmlFor="input-room" className="text-white mb-2">
                    Enter Room ID
                </label>
                <input
                    id="input-room"
                    className="bg-[#070766] rounded-lg w-56 p-3 text-2xl shadow text-white outline-none"
                    type="text"
                />
            </div>

            <button className="flex hover:bg-[#1b61d1] w-56 transform transition duration-500 hover:scale-105 items-center gap-3 text-white bg-[#06419e] px-[4.2rem] font-bold text-2xl py-5 mt-4 rounded-lg shadow mb-3">
                <img className="w-10" src="./icon/play.png" alt="" />
                Play
            </button>

            <button className="text-white px-6 rounded-lg shadow underline" onClick={createPrivateRoom}>
                Create a private game
            </button>
        </div>
    );
}
