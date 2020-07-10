import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  /*
    typescript can infer the return type of the function 
    from the code, hence, specifying return type explicitly 
    is optional.
  */
  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    return await newProduct.save();
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('No product found');
    }
    if (!product) throw new NotFoundException('No product found');
    return product;
  }

  async updateProdcut(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    return await this.productModel.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true },
    );
  }

  async deleteProduct(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
