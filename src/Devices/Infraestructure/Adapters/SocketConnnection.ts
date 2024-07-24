import { WebSocket } from "ws";
import Socket from "../../Domain/Ports/Socket";
import SocketRepository from "../../Domain/Ports/SocketRepository";
import { custom, customText } from "../../../config/Services/customSignale";
import GetDevicesUseCase from "../../Application/UseCase/GetDevicesUseCase";
import { DeviceTriggerSocket } from "../../Domain/DTOS/DeviceResponse";

export default class SocketConnection implements SocketRepository {
    private socket: WebSocket;
    private isReady: boolean = false;
    private queue: Socket[] = [];

    constructor(url: string, readonly deviceRepository: GetDevicesUseCase ) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => { 
            custom.Success(
                '🛰️' +
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + 'Conectado al socket:' + customText.end,
                customText.bold + customText.colors.blanco + `${url}` + customText.end,
                customText.bold + customText.colors.cyan + '| ' + customText.end +
                '🛰️' 
            );

            this.isReady = true;
            this.processQueue();
        };

        this.socket.onclose = () => {
            custom.Close(
                customText.bold + customText.colors.cyan + ' | ' + customText.end +
                customText.colors.magenta + 'Conexión finalizada' + customText.end,
                customText.bold + customText.colors.cyan + ' | ' + customText.end
            );
            this.isReady = false;
        };
 
        this.socket.onerror = (error) => {
            custom.Error('Error en la conexión WebSocket:', error);
        };
    }

    private processQueue() {
        while (this.queue.length > 0 && this.socket.readyState === WebSocket.OPEN) {
            const data = this.queue.shift(); 
            if (data) {
                this.socket.send(JSON.stringify(data)); 
            }
        }
    }
    conection(data: any): void {
        this.send(data);
    }
    sendTrigger(data: DeviceTriggerSocket): void {
        this.send(data);
    }

    private send(data: any){
        if (this.isReady && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            this.queue.push(data);
        }
    }
}