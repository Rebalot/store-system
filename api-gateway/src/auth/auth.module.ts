import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceClient } from './services/auth.service';
import { HttpAuthGuard } from './guards/http-auth.guard';
import { GrpcClientModule } from 'src/common/grpc/grpc-client.module';
import { CustomerServiceClient } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [GrpcClientModule],
  controllers: [AuthController, CustomerController],
  providers: [AuthServiceClient, CustomerServiceClient, HttpAuthGuard],
  exports: [ AuthServiceClient, HttpAuthGuard],
})
export class AuthModule {}