import { IShop } from '../common/interface';

export interface IStateVendor {
  shop: IShop
  error: string
  lstProduct: any[]
  loading: any
}
