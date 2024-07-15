
export default interface SenderEmail{
    sendEmail(deviceName: string): Promise<void>;
}