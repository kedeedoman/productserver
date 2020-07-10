import { Controller, Get, Headers, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post()
  addProducts(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    const generatedId = this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: generatedId };
  }

  @Patch(':id')
  updateProdcut(@Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    this.productService.updateProdcut(id, title, description, price);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
    return null;
  }
}
