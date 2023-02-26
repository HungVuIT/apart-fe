export interface IStateCommon {
  shopList: IShop[]
  loading: boolean
  error: string
}
export const initShopList: IShop[] = [];
export interface IShop {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  content: string
  province: string
  district: string
  ward: string
  address: string
  email: string
  phoneNumber: string
  logo: string
  banner: string | null
  UID: number
  isActive: boolean
}
export const initShop: IShop = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  name: '',
  description: '',
  content: '',
  province: '',
  district: '',
  ward: '',
  address: '',
  email: '',
  phoneNumber: '',
  logo: '',
  banner: null,
  UID: 0,
  isActive: false
};
