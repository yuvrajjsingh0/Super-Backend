import { PaymentMethodDTO } from "./payment_method.dto";

export interface TransactionDTO{
    id?: number,
    customer_id: number,
    status: string,
    amount: number,
    payments?: PaymentMethodDTO[],
    customer?:any
}