import { Request, Response } from "express";
import GetRealTimeStatusDevicesUseCase from "../../Application/UseCase/GetRealTimeStatusDevicesUseCase";

export default class GetRealTimeStatusDevicesController{
    constructor(private readonly deviceRepository: GetRealTimeStatusDevicesUseCase){}

    async run(req:Request, res:Response){
        res.setHeader("Content-type","text/event-Stream");
        res.setHeader("Cache-Control","no/cahe");
        res.setHeader("Connection","kepp-alive");

        return await this.deviceRepository.execute(req, res);
    }
}