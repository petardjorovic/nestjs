import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First name should be a string value' })
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3, { message: 'First name should have minimum 3 characters' })
  @MaxLength(100)
  firstName?: string;

  @IsString({ message: 'Last name should be a string value' })
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3, { message: 'Last name should have minimum 3 characters' })
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  gender: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
