import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';
import { IProductsRepository } from '../interfaces/products.interface';

export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async get(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product, id: number): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
