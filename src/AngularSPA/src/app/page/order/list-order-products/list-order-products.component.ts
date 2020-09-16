import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/models/product.interface';
import { SelectedProductsList } from 'src/app/models/selected-products-list.interface';
import { SelectedProducts, SelectedProductsModel } from 'src/app/models/selected-products.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list-order-products',
  templateUrl: './list-order-products.component.html',
  styleUrls: ['./list-order-products.component.css']
})
export class ListOrderProductsComponent implements OnInit {
  productsObj: Array<SelectedProducts> = new Array<SelectedProductsModel>()
  pagedResult: Array<SelectedProducts>
  qtdSelectedProducts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public _data: SelectedProductsList, private _appService: AppService, private _dialRef: MatDialogRef<ListOrderProductsComponent>) { }

  ngOnInit(): void {
    this.readProducts()
  }

  readProducts() {
    this._data?.selectedProducts?.forEach(item => {
      this.productsObj[this.productsObj.length] = item
    });

    this.pagedResult = this.productsObj.slice(0,5)
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
