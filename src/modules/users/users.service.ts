import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUsersRepository) private readonly userRepository: IUsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.get();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException('E-mail not found!');
    }

    return user;
  }

  async create(user: User): Promise<User> {
    user.password = bcrypt.hashSync(user.password, 8);
    return this.userRepository.create(user);
  }

  async update(id: number, user: User): Promise<void> {
    await this.findOne(id);

    user.password = bcrypt.hashSync(user.password, 8);
    await this.userRepository.update(user, id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
