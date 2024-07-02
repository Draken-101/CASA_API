import { ObjectId } from "mongoose";

export default interface User{
    _id: ObjectId;
    name:string;
    email:string;
    password:string;
    rol:string;
}