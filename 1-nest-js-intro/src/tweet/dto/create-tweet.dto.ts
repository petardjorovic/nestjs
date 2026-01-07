import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  hashtags?: number[];
}
