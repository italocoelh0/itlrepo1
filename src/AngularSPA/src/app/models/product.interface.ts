export interface Product {
  productId: number
  productName: string
  productValue: number
}

export class ProductModel implements Product{
  productId: number
  productName: string
  productValue: number
}
