import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { TweetQueryPaginationDto } from './tweet-query-pagination.dto';

class TweetQueryDateDto {
  @IsOptional()
  @IsDate()
  startdate?: Date;

  @IsOptional()
  @IsDate()
  enddate?: Date;
}

export class TweetQueryDatePaginationDto extends IntersectionType(
  TweetQueryPaginationDto,
  TweetQueryDateDto,
) {}
