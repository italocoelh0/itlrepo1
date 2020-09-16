import { SelectedProducts } from './selected-products.interface'

export interface SelectedProductsList {
  selectedProducts: Array<SelectedProducts>
}

export class SelectedProductsListModel implements SelectedProductsList {
  selectedProducts: Array<SelectedProducts>
}
