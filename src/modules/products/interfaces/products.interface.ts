import { Product } from 'src/models/product.entity';

export interface IProductsRepository {
  get(): Promise<Product[]>;

  getById(id: number): Promise<Product>;

  create(product: Product): Promise<Product>;

  update(product: Product, id: number): Promise<void>;

  delete(id: number): Promise<void>;
}

export const IProductsRepository = Symbol('IProductsRepository');
