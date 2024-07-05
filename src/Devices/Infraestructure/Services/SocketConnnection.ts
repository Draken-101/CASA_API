import Socket from "../../Domain/Ports/Socket";
import SocketRepository from "../../Domain/Repositories/SocketRepository";

export default class SocketConnection implements SocketRepository {

    constructor(private readonly socket: WebSocket) { }
    async sendAction(data: Socket): Promise<void> {
        try {
            this.socket.send(JSON.stringify(data));
            return;
        } catch (error) {
            return error;
        }
    }
}