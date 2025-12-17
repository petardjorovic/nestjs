import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'You should provide a first name' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  firstName: string;

  @IsString({ message: 'You should provide a last name' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsInt()
  @Min(18)
  @Max(120)
  @IsOptional()
  age: number;

  @IsOptional()
  gender: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
