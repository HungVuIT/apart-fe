import { IPaymentDetails } from '../../../interface/payment/interface';

export interface IPropsPayment {
  handleBack?: any
  handleNext?: any
  paymentDetails: IPaymentDetails
  setPaymentDetails: React.Dispatch<React.SetStateAction<IPaymentDetails>>
}
