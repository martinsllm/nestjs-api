import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async update(id: number, user: User): Promise<void> {
    await this.findOne(id);
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
