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
