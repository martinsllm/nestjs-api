import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { IUsersRepository } from '../users/interfaces/users.interface';
import { UsersRepository } from '../users/repositories/users.repository';
import { IAuthRepository } from './interfaces/auth.interface';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class AuthModule {}
