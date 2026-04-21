import { Injectable, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { handleError } from 'src/common/helpers/errorHandler';
import { UpdateProductPayload } from '../types/product.interface';
import { GetProductsQuery } from '../types/get-products-query.interface';

interface ProductGrpcService {
    getPaginatedProducts(query: GetProductsQuery): Observable<any>;
    updateProduct(productData: UpdateProductPayload): Observable<any>;
    deleteProduct({id}: {id: string}): Observable<any>;
}

@Injectable()
export class ProductServiceClient implements OnModuleInit {
  private productService!: ProductGrpcService;

  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductGrpcService>('ProductService');
  }
    async getProducts(query: GetProductsQuery) {
        try {
            return await firstValueFrom(
                this.productService.getPaginatedProducts(query).pipe(timeout(3000)),
            );
        }
        catch (error: any) {
            handleError(error);
        }
    }

}