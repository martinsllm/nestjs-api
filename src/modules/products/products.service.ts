import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { IProductsRepository } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(IProductsRepository)
    private readonly productRepository: IProductsRepository,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.get();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }

  async update(id: number, product: Product): Promise<void> {
    await this.findOne(id);
    await this.productRepository.update(product, id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
}
