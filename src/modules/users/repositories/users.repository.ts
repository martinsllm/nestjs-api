import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { IUsersRepository } from '../interfaces/users.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user: User, id: number): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
