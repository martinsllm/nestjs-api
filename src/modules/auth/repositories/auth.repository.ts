import { UsersService } from 'src/modules/users/users.service';
import { IAuthRepository } from '../interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (await bcrypt.compareSync(password, user.password)) return user;
  }

  async generateToken(payload: User): Promise<string> {
    return await this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.SECRET,
        expiresIn: '1d',
      },
    );
  }
}
