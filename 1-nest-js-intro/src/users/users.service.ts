import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,

    private readonly configService: ConfigService,
  ) {}

  public async getAllUsers() {
    try {
      return await this.usersRepository.find({ relations: { profile: true } });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured, please try again later',
          { description: 'Could not connect to the database' },
        );
      }
      console.log(error);
    }
  }

  public async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const user = this.usersRepository.create(userDto);

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured, please try again later',
          { description: 'Could not connect to the database' },
        );
      }
      if (error.code === '23505') {
        throw new BadRequestException(
          'There is some duplicate value for the user in the database',
        );
      }
      console.log(error);
    }
  }

  public async deleteUser(id: number) {
    await this.usersRepository.delete(id);

    return { deleted: true };
  }
}
