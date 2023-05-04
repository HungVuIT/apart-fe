import { IUserInfo } from '../user/interface';
import { initShop, IShop } from './../common/interface';
export interface IWatch {
  id: number
  createdAt: string
  updatedAt: string

  name: string

  BID?: number
  CID: number[]
  SID: number

  sku?: string
  content?: string
  description?: string

  quantity: number
  saled: number
  price: number
  priceFloor: number

  gender: string
  materialCord?: string
  glassSize?: string
  glassSurface?: string
  width?: string
  height?: string
  length?: string
  weight?: string

  isActive: boolean
  image: string[]
  madeBy?: string
  warranty?: string
  sale_off?: any
  rating: IRating
}
// export interface ISale_off {

// }
export interface IRating {
  score: any
  list: any[]
}
interface ILoadingWatch {
  watch: boolean
  top: boolean
  new: boolean
  sale: boolean
  now: boolean
  cmt: boolean
}
export const initWatch: IWatch = {
  id: 1,
  createdAt: '',
  updatedAt: '',
  name: '',
  SID: 1,
  CID: [],
  description: '',
  content: '',
  quantity: 300,
  saled: 0,
  price: 2000000,
  priceFloor: 1000000,
  gender: '',
  materialCord: '',
  glassSurface: '',
  glassSize: '',
  image: [],
  isActive: true,
  sale_off: 0,
  rating: {
    score: 5,
    list: []
  }
};
export interface IComment {
  id: string
  createdAt: string
  updatedAt: string
  UID: string
  WID: string
  content: string
  user: IUserInfo
}
export interface IStateProduct {
  watch: IWatch
  comment: IComment[]
  rating: IRating
  shop: IShop
  loading: boolean
  error: string
}
export const initStateProduct: IStateProduct = {
  watch: initWatch,
  comment: [],
  rating: {
    score: 0,
    list: []
  },
  shop: initShop,
  loading: false,
  error: ''
};
export interface IStateWatch {
  watchList: IWatch[]
  topWatchList: IWatch[]
  newWatchList: IWatch[]
  saleWatchList: IWatch[]
  loading: ILoadingWatch
  error: string
}
export const initWatchList: IWatch[] = [];
export const initLoadingWatch: ILoadingWatch = {
  watch: false,
  top: false,
  new: false,
  sale: false,
  now: false,
  cmt: false
};
