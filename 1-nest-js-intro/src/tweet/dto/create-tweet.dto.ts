import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
