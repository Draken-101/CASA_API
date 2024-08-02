export default interface SenderMQTT{
    publish(action:any):void;
    onMessage():void;
}