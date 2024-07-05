import Socket from "../../Domain/Ports/Socket";
import SocketRepository from "../../Domain/Repositories/SocketRepository";

export default class SendActionUseCase{
    constructor(private readonly socketRepository: SocketRepository){}

    async execute(socket: Socket){
        await this.socketRepository.sendAction(socket);
    }
}