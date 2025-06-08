import { Injectable, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { handleError } from 'src/common/helpers/errorHandler';

interface CustomerGrpcService {
  create(customerData: CreateCustomerDto): Observable<any>;
}

@Injectable()
export class CustomerServiceClient implements OnModuleInit {
    private customerService!: CustomerGrpcService;

    constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.customerService = this.client.getService<CustomerGrpcService>('CustomerService');
    }

    async createCustomer(customerData: CreateCustomerDto) {
        try {
        return await firstValueFrom(
            this.customerService.create(customerData).pipe(timeout(3000)),
        );
        } catch (error: any) {
        handleError(error);
        }
    }
}