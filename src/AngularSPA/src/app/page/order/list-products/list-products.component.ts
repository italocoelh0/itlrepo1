import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/models/product.interface';
import { SelectedProductsList } from 'src/app/models/selected-products-list.interface';
import { SelectedProducts, SelectedProductsModel } from 'src/app/models/selected-products.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productsObj: Array<SelectedProducts> = new Array<SelectedProductsModel>()
  pagedResult: Array<SelectedProducts>
  qtdSelectedProducts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public _data: SelectedProductsList, private _appService: AppService, private _dialRef: MatDialogRef<ListProductsComponent>) { }

  ngOnInit(): void {
    this.readProducts()
  }

  checkChanged() {
    this.qtdSelectedProducts = this.productsObj.filter(w => w.productSelected == true).length
  }

  readProducts() {
    this._appService.getItems('Products').subscribe((response: Array<Product>) => {
      response.forEach(item => this.productsObj[this.productsObj.length] = { productId: item.productId, productName: item.productName, productValue: item.productValue, productSelected: false })

      this._data?.selectedProducts?.forEach(item => {
        let idx = this.productsObj.findIndex(w => w.productId == item.productId)
        if (idx >= 0)
          this.productsObj[idx].productSelected = true
      });

      this.pagedResult = this.productsObj.slice(0, 5)
    })
  }

  chooseProducts() {
    this.closeDialog(this.productsObj.filter(w => w.productSelected == true))
  }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize
    let endIdx = startIdx + event.pageSize

    if (endIdx > event.length)
      endIdx = event.length

    this.pagedResult = this.productsObj.slice(startIdx, endIdx)
  }

  closeDialog(value?) {
    return this._dialRef.close(value)
  }
}
