import { IsEmail, IsString } from "class-validator";
export class createUSerDto{
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}