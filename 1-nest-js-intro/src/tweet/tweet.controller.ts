import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { GetTweetQueryDto } from 'src/tweet/dto/get-tweet-query.dto';
import { type Request } from 'express';
import { activeUser } from 'src/auth/decorators/active-user.decorator';
import { type ActiveUserType } from 'src/auth/interfaces/active-user-type.interface';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':userId')
  getTweets(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationDto: GetTweetQueryDto,
  ) {
    return this.tweetService.getTweets(userId, paginationDto);
  }

  @Post()
  createTweet(
    @Body() tweet: CreateTweetDto,
    @activeUser() user: ActiveUserType,
  ) {
    return this.tweetService.createTweet(tweet, user);
  }

  @Patch()
  updateTweet(@Body() tweet: UpdateTweetDto) {
    return this.tweetService.updateTweet(tweet);
  }

  @Delete(':id')
  deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
