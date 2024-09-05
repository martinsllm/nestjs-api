import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductsRepository } from './repositories/products.repository';
import { IProductsRepository } from './interfaces/products.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), JwtModule.register({})],
  providers: [
    ProductsService,
    {
      provide: IProductsRepository,
      useClass: ProductsRepository,
    },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
