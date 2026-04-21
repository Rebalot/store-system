import { Module } from "@nestjs/common";
import { GrpcClientModule } from "src/common/grpc/grpc-client.module";
import { ProductController } from "./controllers/product.controller";
import { ProductServiceClient } from "./services/product.service";

@Module({
  imports: [GrpcClientModule],
  controllers: [ProductController],
  providers: [ProductServiceClient],
})
export class InventoryModule {}