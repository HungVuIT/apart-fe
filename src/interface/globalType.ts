export interface IPropsChildren {
  children: JSX.Element
}
export interface IPropsInput {
  type: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
export interface GlobalContext {
  loading: boolean
}
export interface ContextProviderProps {
  children: React.ReactNode
}
export enum typeToast {
  SUCCESS = 'success',
  ERROR = 'error'
}
