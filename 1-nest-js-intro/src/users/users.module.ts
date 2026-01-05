import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from 'src/auth/config/auth.config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PaginationModule,
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(authConfig),
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: (authConfiguration: ConfigType<typeof authConfig>) => ({
        secret: authConfiguration.jwtSecretKey,
        signOptions: {
          expiresIn: authConfiguration.jwtExpiresIn,
          audience: authConfiguration.jwtAudience,
          issuer: authConfiguration.jwtIssuer,
        },
      }),
      inject: [authConfig.KEY],
    }),
  ],
})
export class UsersModule {}
