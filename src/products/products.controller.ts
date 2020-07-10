import {
  Controller,
  Get,
  Headers,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post()
  async addProducts(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const addedProduct = await this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: addedProduct._id };
  }

  @Patch(':id')
  async updateProdcut(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return await this.productService.updateProdcut(
      id,
      title,
      description,
      price,
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
