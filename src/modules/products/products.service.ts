import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }

  async update(id: number, product: Product): Promise<void> {
    await this.findOne(id);
    await this.productRepository.update(id, product);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
}
