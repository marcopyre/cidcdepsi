import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/products/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllPolls();
  }
}
