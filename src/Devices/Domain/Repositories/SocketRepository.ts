import Socket from "../Ports/Socket";

export default interface SocketRepository{
    sendAction(data:Socket):Promise<void>;
}