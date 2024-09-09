import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthRepository } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const login = await this.authRepository.validateCredentials(
      email,
      password,
    );

    if (!login) throw new UnauthorizedException();

    const token = await this.authRepository.generateToken(login);

    return {
      access_token: token,
    };
  }
}
