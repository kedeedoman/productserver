import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private getId(): string {
    return new Date().getTime().toString();
  }

  private findProduct(id: string): [number, Product] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException("Product with given Id does not exist");
    return [productIndex, product];
  }

  /*
    typescript can infer the return type of the function 
    from the code, hence, specifying return type explicitly 
    is optional.
  */
  insertProduct(title: string, description: string, price: number) {
    const id = this.getId();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }


  getProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const product = this.findProduct(id)[1];
    return { ...product };
  }

  updateProdcut(id: string, title: string, description: string, price: number) {
    const [productIndex, product] = this.findProduct(id);
    const newProduct = { ...product };
    if (title) newProduct.title = title;
    if (description) newProduct.description = description;
    if (price) newProduct.price = price;
    this.products[productIndex] = newProduct;
  }

  deleteProduct(id: string) {
    const [productIndex, product] = this.findProduct(id);
    this.products.splice(productIndex, 1);
  }

}
