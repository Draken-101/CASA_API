import Socket from "./Socket";

export default interface SocketRepository {
    sendAction(data: Socket): void;
    onMessage(callback: (message: string) => void): void;
}