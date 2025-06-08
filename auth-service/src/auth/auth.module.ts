import { forwardRef, Module } from '@nestjs/common';
import { AuthGrpcController } from './controllers/auth.grpc.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    JwtModule.registerAsync({
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthGrpcController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}