export interface IPropsChildren {
  children: JSX.Element
}
export interface IPropsInput {
  type: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}