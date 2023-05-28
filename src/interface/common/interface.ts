import { Socket } from 'socket.io-client';
import { IWatch } from './../watch/watchType';
export interface IStateCommon {
  shopList: IShop[]
  search: string
  searchLst: IWatch[]
  loadingSearch: boolean
  error: string
  socket: Socket | any
  inforSocket: IInforSocket
  categoryAndBrand: ICategoryAndBrand
}
export interface ICategoryAndBrand {
  categories: Category[]
  brands: IBrand[]
}
export interface IInforSocket {
  receiverId: number
  open: boolean
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
export interface Category {
  createdAt: string
  description: string
  id: number
  image: any
  name: string
  updatedAt: string
}
export interface INews {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string
}
export interface IBrand {
  createdAt: string
  description: string
  id: number
  image: any
  name: string
  updatedAt: string
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
