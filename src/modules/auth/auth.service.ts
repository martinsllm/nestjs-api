import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (await bcrypt.compareSync(password, user.password)) {
      return await this.generateToken(user);
    }

    throw new UnauthorizedException('Invalid password!');
  }

  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: process.env.SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }
}
