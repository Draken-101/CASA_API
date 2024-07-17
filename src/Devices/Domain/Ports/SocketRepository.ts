import { DeviceTriggerResponse, DeviceTriggerSocket } from "../DTOS/DeviceResponse";
import Socket from "./Socket";

export default interface SocketRepository {
    sendAction(data: Socket): void;
    sendTrigger(data: DeviceTriggerSocket): void;
    onMessage(callback: (message: string) => void): void;
}