import { Module } from '@nestjs/common';
import { Product } from './products/product.entity';
import { ProductService } from './products/product.service';
import { ProductController } from './products/product.controller';
import { AppController } from './app.controller';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'cicd',
      entities: [Product, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User]),
    AuthModule,
  ],
  providers: [ProductService, UsersService],
  controllers: [ProductController, AppController],
})
export class AppModule {}
