import { Module } from '@nestjs/common';
import { Product } from './products/product.entity';
import { ProductService } from './products/product.service';
import { ProductController } from './products/product.controller';
import { AppController } from './app.controller';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { Post } from './post/post.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: 5432,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      entities: [Product, User, Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, User, Post]),
    AuthModule,
  ],
  providers: [ProductService, UsersService, PostService],
  controllers: [ProductController, AppController, PostController],
})
export class AppModule {}
