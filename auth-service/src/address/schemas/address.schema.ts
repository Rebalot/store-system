import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;
@Schema({ collection: 'customer_addresses', timestamps: true })
export class Address {
    @Prop({ required: true })
  addressLine1!: string;

  @Prop()
  addressLine2?: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  state!: string;

  @Prop({ required: true })
  postalCode!: string;

  @Prop({ required: true })
  country!: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);