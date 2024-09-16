import { io } from 'socket.io-client';

export class Socket {
    constructor() {
        this.socket = io('http://localhost:3000', {
            autoConnect: false
        });
        this.socket.connect();
    }

    getId() {
        this.socket.on('connect', () => {
            return this.socket.id;
        });
    }

    joinRoom(roomId) {
        this.socket.emit('join-room', roomId);
    }

    getRoomId() {
        this.socket.on('join-room', (roomId) => {
            return roomId;
        });
    }
}