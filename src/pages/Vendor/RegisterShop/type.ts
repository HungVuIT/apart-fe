export interface IRegisterShop {
  email: string
  name: string
  province: string
  district: string
  ward: string
  address: string
  phoneNumber: string
  description: string
}
export interface IProvince {
  province_id: string
  province_name: string
  province_type: string
}
export interface IDistrict {
  district_id: string
  district_name: string
  district_type: string
  province_id: string
}
export interface IWard {
  district_id: string
  ward_id: string
  ward_name: string
  ward_type: string
}
