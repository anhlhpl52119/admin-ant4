export interface Gen {
  id: string
}
export interface PropTypes<T> {
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
  label?: string
  labelClass?: string
  initialValue?: string
  isReadOnly?: boolean
  disabledOptions?: string[]
  requestData: (v?: ApiQueryAttr<T>) => Promise<T[]>
  labelKey: keyof T
}
