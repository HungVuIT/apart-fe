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
