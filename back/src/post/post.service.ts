/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createProduct(dto: PostDto): Promise<Post> {
    const product = this.postRepository.create(dto);
    return this.postRepository.save(product);
  }

  async updateProduct(dto: PostDto, id: number): Promise<Post> {
    const product = await this.postRepository.findOneBy({ id });

    const updatedProduct = {
        ...dto,
        id: product.id
    }

    return this.postRepository.save(updatedProduct);
  }

  async getAllPolls(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async deleteProduct(id: number) {
    return await this.postRepository.delete(id)
  }
}
