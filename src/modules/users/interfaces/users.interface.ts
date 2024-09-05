import { User } from 'src/models/user.entity';

export interface IUsersRepository {
  get(): Promise<User[]>;

  getById(id: number): Promise<User>;

  getByEmail(email: string): Promise<User>;

  create(user: User): Promise<User>;

  update(user: User, id: number): Promise<void>;

  delete(id: number): Promise<void>;
}

export const IUsersRepository = Symbol('IUsersRepository');
