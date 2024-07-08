import { WebSocket } from "ws";
import Socket from "../../Domain/Ports/Socket";
import SocketRepository from "../../Domain/Repositories/SocketRepository";
import { custom, customText } from "../../../config/Services/customSignale";

export default class SocketConnection implements SocketRepository {
    private socket: WebSocket;
    private isReady: boolean = false;
    private queue: Socket[] = [];

    constructor(url: string) {
        this.socket = new WebSocket(url, {
            rejectUnauthorized: false // Aceptar certificados autofirmados (solo para desarrollo)
        });

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
    sendAction(data: Socket): void {
        if (this.isReady && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            this.queue.push(data);
        }
    }
    onMessage(callback: (message: string) => void): void {
        this.socket.onmessage = (event) => {
            if (typeof event.data === 'string') {
              callback(event.data);
            } else if (Buffer.isBuffer(event.data)) {
              callback(event.data.toString('utf-8'));
            } else if (event.data instanceof ArrayBuffer) {
              callback(Buffer.from(event.data).toString('utf-8'));
            } else if (Array.isArray(event.data)) {
              callback(Buffer.concat(event.data).toString('utf-8'));
            } else { 
              console.error('Unknown data type received from WebSocket:', event.data);
            }
        };
    }
}