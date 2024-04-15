import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createProduct(@Body() dto: PostDto) {
    return this.postService.createProduct(dto);
  }

  @Get()
  getAllProducts() {
    return this.postService.getAllPolls();
  }
}
