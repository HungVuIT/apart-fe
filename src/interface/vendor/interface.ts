import { IShop } from '../common/interface';

interface ILoading {
  product: boolean
  profile: boolean
}
export interface IStateVendor {
  shop: IShop
  error: string
  lstProduct: any[]
  loading: ILoading
}
export interface IOrderShop {
  id: number
  SID: number
  UID: number
  createdAt: string
  updatedAt: string
  status: string
  total: number
  paymentMethod: string
  Note: any
  isActive: boolean
}
