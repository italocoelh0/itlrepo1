export interface SelectedProducts {
  productId: number
  productName: string
  productValue: number
  productSelected : boolean
}

export class SelectedProductsModel implements SelectedProducts{
  productId: number
  productName: string
  productValue: number
  productSelected : boolean
}
