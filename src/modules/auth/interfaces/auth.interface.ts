import { User } from 'src/models/user.entity';

export interface IAuthRepository {
  validateCredentials(email: string, password: string): Promise<User>;

  generateToken(payload: User): Promise<string>;
}

export const IAuthRepository = Symbol('IAuthRepository');
