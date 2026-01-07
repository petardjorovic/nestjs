import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { ActiveUserType } from 'src/auth/interfaces/active-user-type.interface';
import { Hashtag } from 'src/hashtag/hashtag.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getTweets(
    userId: number,
    paginationDto: PaginationQueryDto,
  ): Promise<Pagination<Tweet>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return await this.paginationProvider.paginationQuery<Tweet>(
      paginationDto,
      this.tweetRepository,
      { user: { id: userId } },
      { user: true, hashtags: true },
    );
  }

  public async createTweet(
    createTweetDto: CreateTweetDto,
    activeUser: ActiveUserType,
  ) {
    let user: User | undefined = undefined;
    let hashtags: Hashtag[] | undefined = undefined;

    try {
      user = await this.usersService.getUserById(activeUser.sub);

      if (createTweetDto.hashtags) {
        hashtags = await this.hashtagService.findHashtags(
          createTweetDto.hashtags,
        );
      }
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (createTweetDto.hashtags?.length !== hashtags?.length) {
      throw new BadRequestException();
    }

    const newTweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user,
      hashtags: hashtags,
    });

    try {
      return await this.tweetRepository.save(newTweet);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags || [],
    );

    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });
    if (tweet) {
      tweet.text = updateTweetDto.text ?? tweet.text;
      tweet.image = updateTweetDto.image ?? tweet.image;
      tweet.hashtags = hashtags;
    }

    return await this.tweetRepository.save(tweet ?? {});
  }

  public async deleteTweet(id: number) {
    await this.tweetRepository.delete({ id });

    return { deleted: true, id };
  }
}
