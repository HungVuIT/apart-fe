import { IWatch } from '../watch/watchType';
import { ROLE } from './enum';
export interface IUserInfo {
  id: number
  createdAt: string
  updatedAt: string
  username: string
  email: string | null
  phoneNumber: string | null
  firstName: string | null
  lastName: string | null
  province: string | null
  district: string | null
  ward: string | null
  address: string | null
  birthDay: string | null
  avatar: string
  status: string | null
  role: ROLE
  gender: string | null
  isActive: boolean
}
export interface IProfile {
  email: string
  fullname: string | null
  phoneNumber: string | null
  gender: string | null
  birthDay: string | null
  avatar: string
  province: string
  district: string
  ward: string
  address: string
}
export interface IEditProfile {
  email: string
  firstName: string | null
  lastName: string | null
  phoneNumber: string | null
  gender: string | null
  birthDay: string | null
  avatar: any
  province: string
  district: string
  ward: string
  address: string
}
export interface ICart {
  id: number
  createdAt: string
  updatedAt: string
  UID: number
  WID: number
  quantity: number
  isActive: boolean
  watch: IWatch
}
interface ILoadingUser {
  cart: boolean
  profile: boolean
}
export interface IStateUser {
  profile: IUserInfo
  error: string
  loading: ILoadingUser
  cart: ICart[]
  payment: ICartItemPayment
}
export interface ICartItemPayment {
  items: ICart[]
  itemPrice: number
  shipPrice: number
}
export const initCartItemPayment: ICartItemPayment = {
  items: [],
  itemPrice: 0,
  shipPrice: 0
};

export const initUserInfo: IUserInfo = {
  id: 1,
  createdAt: '',
  updatedAt: '',
  username: '',
  email: null,
  phoneNumber: null,
  firstName: null,
  lastName: null,
  province: null,
  district: null,
  ward: null,
  address: null,
  birthDay: null,
  avatar: '',
  status: null,
  gender: null,
  role: ROLE.CUSTOMER,
  isActive: true
};
export const initCart: ICart[] = [];
