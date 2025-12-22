import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  getTweets(userId: number) {
    console.log(userId);
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.usersService.getUserById(createTweetDto.userId);

    const newTweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user ?? {},
    });

    return await this.tweetRepository.save(newTweet);
  }
}
