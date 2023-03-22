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
  ship: any
  typePayment: any
}
export const initPaymentDetail: IPaymentDetails = {
  infor: initInforPayment,
  ship: '',
  typePayment: ''
};
