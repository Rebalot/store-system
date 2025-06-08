import { CustomerGrpcController } from "./controllers/customer.grpc.controller";
import { CustomerService } from "./customer.service";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schemas/customer.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  controllers: [CustomerGrpcController],
  providers: [CustomerService],
  exports: [CustomerService]
  })
  export class CustomerModule {}