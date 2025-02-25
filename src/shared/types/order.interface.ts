import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

interface IAmount {
  value: number;
  currency: string;
}

interface IRecipient {
  account_id: string | null;
  gateway_id: string | null;
}

interface IPaymentMethod {
  type: string;
  id: string | null;
  saved: boolean;
}

interface IConfirmation {
  type: string;
  return_url: string;
  confirmation_url: string;
}

export interface IPaymentResponse {
  id: string;
  url: string;
  status: string;
  amount: IAmount;
  recipient: IRecipient;
  payment_method: IPaymentMethod;
  created_at: number;
  confirmation: IConfirmation;
}

export enum EnumOrderStatus {
  PENDING = 'Pending',
  PAYED = 'Payed'
}

export interface IOrder {
  id: string;
  createdAt: string;
  items: ICartItem[];
  status: EnumOrderStatus;
  user: IUser;
  total: number;
  stripeSessionId?: string;
}
