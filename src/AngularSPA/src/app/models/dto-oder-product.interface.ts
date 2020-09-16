export interface DtoOrderProduct {
  orderId: number
  productId : number
}

export class DtoOrderProductModel implements DtoOrderProduct {
  orderId: number
  productId : number
}
