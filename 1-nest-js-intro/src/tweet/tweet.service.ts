import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly usersService: UsersService) {}

  tweets: { text: string; date: string; userId: number }[] = [
    { text: 'Some tweet text', date: '12-08-2025', userId: 1 },
    { text: 'Some other tweet text', date: '10-06-2025', userId: 1 },
    { text: 'Some super tweet text', date: '01-08-2025', userId: 2 },
  ];

  getTweets(userId: number) {
    const user = this.usersService.getUserById(userId);
    if (user) {
      const tweets = this.tweets.filter((t) => t.userId === userId);
      return tweets.map((t) => ({
        text: t.text,
        date: t.date,
        name: user.name,
      }));
    }
    return 'User not found!';
  }
}
