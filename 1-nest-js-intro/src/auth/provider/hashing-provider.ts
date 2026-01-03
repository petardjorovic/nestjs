import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  public abstract hashPassword(data: string | Buffer): Promise<string>;
  public abstract comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean>;
}
