import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

export const featureModules = [AuthModule, UsersModule, ProductsModule]