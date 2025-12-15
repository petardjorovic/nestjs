import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService {
  getAllTweets() {
    return 'These are all tweets';
  }
}
