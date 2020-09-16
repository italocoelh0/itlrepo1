import { Product } from './product.interface'

export interface Order {
  orderId: number
  products: Array<Product>
  orderValidity: Date
  orderValue: number
  orderDiscount: number
}

export class OrderModel implements Order {
  orderId: number
  products: Array<Product>
  orderValidity: Date
  orderValue: number
  orderDiscount: number
}
