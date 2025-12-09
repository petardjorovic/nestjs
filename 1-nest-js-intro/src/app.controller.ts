import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pero')
  getSomething(): number {
    return this.appService.getPero();
  }

  @Post()
  postHello(): string {
    return 'Post request hanling';
  }
}
