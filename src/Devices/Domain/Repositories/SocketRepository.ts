import Socket from "../Ports/Socket";

export default interface SocketRepository {
    sendAction(data: Socket): void;
    onMessage(callback: (message: string) => void): void;
}