import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from '../customer/customer.service';
import { CustomerDocument } from '../customer/schemas/customer.schema';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(customer: CustomerDocument): Promise<string> {
    const payload = {
      sub: customer._id,
      email: customer.email,
      role: customer.role,
    };
    const token = this.jwtService.sign(payload);
    if (!token) {
      throw new RpcException({code: status.INTERNAL, message: 'Token generation failed'});
    }
    return token;
  }

  async validateCustomer(email: string, password: string): Promise<CustomerDocument> {	
    const customer = await this.customerService.findByEmail(email);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new RpcException({code: status.UNAUTHENTICATED, message: 'Invalid credentials'});
    }
    return customer;
  }

  async validateToken(token: string): Promise<CustomerDocument> {
      const decoded = this.jwtService.verify(token);
      const customer = await this.customerService.findById(decoded.sub);
      if (!customer) throw new RpcException({code: status.UNAUTHENTICATED, message: 'Unauthorized'});

      return customer;
  }
}