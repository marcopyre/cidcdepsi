import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/products/product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.getProduct(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ProductDto,
  ) {
    return this.productService.updateProduct(dto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }
}
