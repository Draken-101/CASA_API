
export default interface EmailRepository{
    sendEmail(deviceName: string): Promise<void>;
}