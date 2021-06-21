import { ArrayMinSize, ArrayNotEmpty, IsNotEmpty, IsNotEmptyObject, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AuthorDTO } from "./author.dto";

export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly name: string;

    @IsNotEmpty()
    @Type(()=>AuthorDTO)
    @ArrayMinSize(1)
    @ValidateNested({each : true})
    // @IsNotEmptyObject({})
    readonly author: AuthorDTO[];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly language: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly releaseYear: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly publisher: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly pages: number;

}