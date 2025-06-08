import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
export class CreateCustomerDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @Matches(namePattern, {
        message: 'First name must be one or more words with only letters and single spaces',
      })
    firstName!: string;

    @IsString()
    @Matches(namePattern, {
        message: 'Last name must be one or more words with only letters and single spaces',
      })
    lastName!: string;

    @IsOptional()
    @IsString()
    @Matches(/^\+?[0-9\s\-()]+$/, {
        message: 'Phone number must be a valid phone number',
      })
    phone?: string;
}