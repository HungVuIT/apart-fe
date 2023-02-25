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
  isActive: boolean
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
}
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
  role: ROLE.CUSTOMER,
  isActive: true
};
export const initCart: ICart[] = [];
