import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;
@Schema({ collection: 'store_customers', timestamps: true })
export class Customer {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string; // Hasheado

  @Prop({ required: false, default: null })
  phone?: string;

  @Prop()
  avatar!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Address' }] })
  addresses?: Types.ObjectId[];

  @Prop({ default: 'customer' })
  role!: string;

  @Prop()
  stripeCustomerId?: string;

  @Prop({ default: false })
  isVerified!: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);