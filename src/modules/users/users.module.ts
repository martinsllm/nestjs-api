import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { IUsersRepository } from './interfaces/users.interface';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
