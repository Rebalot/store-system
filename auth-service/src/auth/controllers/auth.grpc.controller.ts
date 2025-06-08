import { Controller } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthGrpcController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: { email: string; password: string }): Promise<{ accessToken: string }> {
    const customer = await this.authService.validateCustomer(data.email, data.password);
    const token = await this.authService.login(customer);
    return { accessToken: token };
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validate(data: { accessToken: string }) {
    const customer = await this.authService.validateToken(data.accessToken);
    return {
      id: customer._id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone ?? null,
      avatar: customer.avatar,
      addresses: customer.addresses ?? [],
    };
  }
}