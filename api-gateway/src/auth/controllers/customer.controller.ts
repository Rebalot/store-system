import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerServiceClient } from '../services/customer.service';
import { HttpAuthGuard } from '../guards/http-auth.guard';
import { Response } from 'express';


@Controller('api/auth')
export class CustomerController {
    constructor(private readonly customerService: CustomerServiceClient) {}

    // Customer
    @Post('/register')
    async createCustomer(@Body() customerData: CreateCustomerDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken } = await this.customerService.createCustomer(customerData);
        res.cookie('session', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // solo en HTTPS si es true
        sameSite: 'lax', // permite el envío de cookies en solicitudes de origen cruzado
        maxAge: 1000 * 60 * 60 * 1, // 1 hora
        });
        return { message: 'Customer created successfully' };
    }
}