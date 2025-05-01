import { IsIn, IsString } from 'class-validator';
export class SignUpDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsString()
    @IsIn(['AMAZONE', 'ADMIN'])
    role: string;
}