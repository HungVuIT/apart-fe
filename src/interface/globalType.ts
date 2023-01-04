export interface IMenuItem {
  icon: any
  name: string
  func: () => void
}

export interface IPropsChildren {
  children: JSX.Element
}
export interface IPropsInput {
  type: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  keyDown?: () => void
}
export interface GlobalContext {
  isLoading: boolean
  setIsLoading: (c: boolean) => void
  nowUrl: string
  setNowUrl: (c: string) => void
}
export interface ContextProviderProps {
  children: React.ReactNode
}
export enum typeToast {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}
