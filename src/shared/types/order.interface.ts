// shared/types/order.interface.ts
import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

// Интерфейс для суммы (аналог amount_total в Stripe)
interface IAmount {
  value: number; // Сумма в центах, например 99999900
  currency: string; // Например, "usd"
}

// Интерфейс для получателя (recipient), адаптирован под Stripe
interface IRecipient {
  account_id: string | null; // В Stripe нет прямого аналога, оставляем null-able
  gateway_id: string | null; // Аналогично
}

// Интерфейс для метода оплаты (payment_method), адаптирован под Stripe
interface IPaymentMethod {
  type: string; // Например, "card" из payment_method_types
  id: string | null; // ID метода оплаты или null до завершения
  saved: boolean; // Обычно false для Checkout Session
}

// Интерфейс для подтверждения (confirmation), адаптирован под Stripe
interface IConfirmation {
  type: string; // "redirect" для Stripe Checkout
  return_url: string; // Соответствует success_url, например "http://localhost:3000/thanks"
  confirmation_url: string; // Соответствует url, например "https://checkout.stripe.com/..."
}

export interface IPaymentResponse {
  id: string; // "cs_test_a1WjZmLj6drvBzvXX8MqDmzirpt0Tr4Mn3SIxUaA4XDc9fPNRjBpFjHGyo"
  url: string;
  status: string; // "open", "complete", "expired"
  amount: IAmount; // { value: 99999900, currency: "usd" } из amount_total
  recipient: IRecipient; // { account_id: null, gateway_id: null }
  payment_method: IPaymentMethod; // { type: "card", id: null, saved: false }
  created_at: number; // 1740136032 из created
  confirmation: IConfirmation; // { type: "redirect", return_url: "http://localhost:3000/thanks", confirmation_url: "https://checkout.stripe.com/..." }
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
  stripeSessionId?: string; // Опционально для связи с Stripe Checkout Session
}
