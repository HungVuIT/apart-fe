export interface IInforPayment {
  email: string
  firstName: string
  lastName: string
  province: string
  district: string
  ward: string
  address: string
  phoneNumber: string
}
export const initInforPayment: IInforPayment = {
  email: '',
  firstName: '',
  lastName: '',
  province: '',
  district: '',
  ward: '',
  address: '',
  phoneNumber: ''
};
export interface IPaymentDetails {
  infor: IInforPayment
  deliveryOption: string
  paymentMethod: string
}
export interface ICheckOut {
  email: string
  firstName: string
  lastName: string
  province: string
  district: string
  ward: string
  address: string
  phoneNumber: string
  deliveryOption: string
  paymentMethod: string
}
export const initPaymentDetail: IPaymentDetails = {
  infor: initInforPayment,
  deliveryOption: '',
  paymentMethod: ''
};
