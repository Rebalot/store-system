import { Controller, Get, Query } from "@nestjs/common";
import { ProductServiceClient } from "../services/product.service";
import { GetProductsQuery } from "../types/get-products-query.interface";


@Controller('api/inventory')
export class ProductController {
  constructor(private readonly productService: ProductServiceClient) {}

    //Product
    @Get('/get-products')
  async getProducts(@Query() query: GetProductsQuery) {
    const products = await this.productService.getProducts(query);
    return products;
  }

}