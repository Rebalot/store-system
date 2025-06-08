import { Types } from "mongoose";

export interface CustomerPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }

export interface CustomerResponse {
    id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    addresses: Types.ObjectId[];
    avatar: string;
  }