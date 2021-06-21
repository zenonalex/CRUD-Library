import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthorDTO{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly surName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly nickName: string;

}