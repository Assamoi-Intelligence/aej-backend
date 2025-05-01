import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
export class CreateProjectDto {
    @IsString() @IsNotEmpty() firstName: string;
    @IsString() @IsNotEmpty() lastName: string;

    @IsDate()
    @Transform(({value}) => new Date(value))
    dateOfBirth: Date;

    @IsString() placeOfBirth: string;
    @IsString() email: string;
    @IsString() type: string;
    @IsString() legalForm: string;
    @IsString() idCardNumber: string;
    @IsString() status: string;
}
