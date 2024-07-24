import { DeviceTriggerSocket } from "../DTOS/DeviceResponse";

export default interface SocketRepository {
    sendTrigger(data: DeviceTriggerSocket): void;
    conection(data: any):void;
}