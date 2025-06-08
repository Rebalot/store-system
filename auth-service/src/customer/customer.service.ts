import { Model } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Customer, CustomerDocument} from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerPayload} from './types/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async createCustomer(userData: CustomerPayload): Promise<CustomerDocument | undefined> {
      let seed : string = '';
      const oneFirstName = userData.firstName.split(' ')[0];
        seed = oneFirstName;
      if(userData.lastName) {
        const oneLastName = userData.lastName.split(' ')[0];
        seed += '%20' + oneLastName;
      }
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      const newUser = new this.customerModel({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone ?? null,
        avatar: `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`
      });
      return newUser.save();
    }
    async findById(id: string): Promise<CustomerDocument | null> {
      return this.customerModel.findById(id).exec();
    }
    async findByEmail(email: string): Promise<CustomerDocument | null> {
      return this.customerModel.findOne({ email }).exec();
    }
  
}