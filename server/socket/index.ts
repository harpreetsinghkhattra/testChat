import { UserData } from './user.data.interface';
import { Chat } from './chat';

export class Index {
    public IO: any;
    public usersList: UserData[] = [];
    constructor(io) {
        this.IO = io;
    }

    /** Get socket instance */
    get socketInstance() {
        return this.IO;
    }

    init() {
        this.IO.on('connection', (socket) => {
            socket.on('/socket/api/saveUser', (data) => {
                if (this.usersList.findIndex((item) => item.socketId === socket.id) === -1) this.usersList.push({ socketId: socket.id, userId: socket.id });
                this.IO.emit('/socket/api/updateUserList', { data: this.usersList });
            });

            /** Initialize chat sockets */
            const chatInstance = new Chat(socket, this.IO);
            chatInstance.chatInit();
            
            /** Disconnect user while disconnecting */
            socket.on('disconnect', (data) => {
                if (this.usersList.findIndex((item) => item.socketId === socket.id) > -1) this.usersList.splice(this.usersList.findIndex((item) => item.socketId === socket.id), 1);
                this.IO.emit('/socket/api/updateUserList', { data: this.usersList });
            });
        })
    }
}