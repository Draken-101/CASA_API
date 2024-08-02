import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import TriggerDeviceUseCase from '../../Application/UseCase/TriggerDeviceUseCase';
import SenderMQTT from '../../Domain/Ports/SenderMQTT'
import SocketRepository from '../../Domain/Ports/SocketRepository';

export default class MQTTConection implements SenderMQTT {
    private client: MqttClient;
    private topic: string;

    constructor(uri: string, options: IClientOptions, topic: string, private readonly triggerDeviceUseCase: TriggerDeviceUseCase, private readonly socket: SocketRepository) {
        this.topic = topic;
        this.client = mqtt.connect(uri, options);

        this.client.on('connect', () => {
            console.log('Conectado al broker MQTT');

            // Suscribirse a un tema
            this.client.subscribe(this.topic, (err) => {
                if (err) {
                    console.error('Error al suscribirse al tema:', err);
                } else {
                    console.log(`Suscrito al tema: ${this.topic}`);
                }
            });
        });

        // Manejar errores de conexión
        this.client.on('error', (err) => {
            console.error('Error de conexión:', err);
        });

        // Intentar reconexión en caso de desconexión
        this.client.on('offline', () => {
            console.warn('MQTT Client está offline, intentando reconectar...');
            this.client.reconnect();
        });

        this.client.on('reconnect', () => {
            console.log('Reconectando al broker MQTT...');
        });
    }

    async onMessage() {
        // Manejar mensajes recibidos
        this.client.on('message', (topic, data) => {
            const dataJson: any = JSON.parse(data.toString());
            console.log(`Mensaje recibido en el tema ${topic}: ${dataJson.device}`);
            if (dataJson.device == 'Temperature') {
                this.socket.sendTemperature({ event: 'Temperature', temperature: dataJson.temperatureC })
            } else {
                this.triggerDeviceUseCase.execute({
                    nameDevice: dataJson.device,
                    status: dataJson.status,
                    roleUser: 'Admin',
                    nameUser: 'admin'
                })
            }
        });
    }

    // Método para publicar mensajes
    publish(action: any) {
        // Crear un objeto JSON con los datos de acción
        const object = JSON.stringify({ device: action.device.nameDevice, status: action.device.status });
        console.log(action.device);
        // Publicar el mensaje en el tema 'triggers'
        this.client.publish('triggers', object, (err: any) => {
            if (err) {
                console.error('Error al publicar mensaje:', err);
            } else { 
                console.log(`Mensaje publicado en el tema 'triggers': ${object}`);
            }  
        });   
    }    
} 
 