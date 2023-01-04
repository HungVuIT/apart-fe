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

}
