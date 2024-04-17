import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
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

  @Put(':id')
  updateProduct(@Body() dto: ProductDto, @Param('id') id: number) {
    return this.productService.updateProduct(dto, id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllPolls();
  }
}
