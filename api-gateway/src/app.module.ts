import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GrpcClientModule } from './common/grpc/grpc-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GrpcClientModule,
    AuthModule,
  ],
})
export class AppModule {}