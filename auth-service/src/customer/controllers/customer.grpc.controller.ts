import { Controller, forwardRef, Inject, UseFilters } from "@nestjs/common";
import { CustomerService } from "../customer.service";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { MongoExceptionFilter } from "../filters/mongo-exception.filter";
import { status } from "@grpc/grpc-js";
import { CustomerPayload, CustomerResponse } from "../types/customer.interface";
import { AuthService } from "../../auth/auth.service";

@Controller()
export class CustomerGrpcController {
  constructor(
    @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    private readonly customerService: CustomerService) {}

  @GrpcMethod('CustomerService', 'Create')
  @UseFilters(MongoExceptionFilter)
  async create(customerData: CustomerPayload): Promise<{accessToken: string}> {
    console.log('Creating customer with data:', customerData);
    const customer = await this.customerService.createCustomer(customerData);
    if (!customer) {
      throw new RpcException({code: status.INTERNAL, message: 'Customer creation failed'});
    }
    const token = await this.authService.login(customer);
    return { accessToken: token };
  }

  @GrpcMethod('CustomerService', 'FindByEmail')
  async findByEmail({ email }: { email: string }): Promise<CustomerResponse> {
    const customer = await this.customerService.findByEmail(email);
    if (!customer) throw new RpcException({code: status.NOT_FOUND, message: 'Customer not found'});
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

  @GrpcMethod('CustomerService', 'FindById')
  async findById({ id }: { id: string }): Promise<CustomerResponse> {
    const customer = await this.customerService.findById(id);
    if (!customer) throw new RpcException({code: status.NOT_FOUND, message: 'Customer not found'});
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