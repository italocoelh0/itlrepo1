import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Order, OrderModel } from 'src/app/models/order.interface';
import { Product } from 'src/app/models/product.interface';
import { SelectedProductsList, SelectedProductsListModel } from 'src/app/models/selected-products-list.interface';
import { SelectedProducts } from 'src/app/models/selected-products.interface';
import { AppService } from 'src/app/services/app.service';
import { ListProductsComponent } from '../list-products/list-products.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  orderObj: Order = new OrderModel()
  pagedResult: Array<Product>

  frmOrderValue: string
  frmOrderDiscount: string
  frmOrderValidity: Date
  frmOrderProducts: Array<Product> = new Array<Product>()

  selectedProducts: SelectedProductsList = new SelectedProductsListModel()

  constructor(private _dialRef: MatDialogRef<CreateOrderComponent>, private _dial: MatDialog, private _msg: MatSnackBar, private _appService: AppService) { }

  ngOnInit(): void {
  }

  addProduct() {
    let dial = this._dial.open(ListProductsComponent, { maxWidth: '750px', data: { ...this.selectedProducts } });
    dial.afterClosed().subscribe((response: Array<SelectedProducts>) => {
      if (response == null || response == undefined)
        return;
      else {
        this.selectedProducts.selectedProducts = response
        let products = new Array<Product>()
        response.forEach(item => products[products.length] = { productId: item.productId, productName: item.productName, productValue: item.productValue })
        this.frmOrderProducts = products
        this.pagedResult = this.frmOrderProducts.slice(0, 5)
        return this.orderProductsChanged()
      }
    });
  }

  orderProductsChanged() {
    let valSum = 0.00
    let valDisc = parseFloat(this.frmOrderDiscount == null || this.frmOrderDiscount == '' ? '0' : this.frmOrderDiscount)

    this.frmOrderProducts.forEach(item => valSum += item.productValue)

    if (valSum < valDisc) {
      this.frmOrderDiscount = '0'
      this._msg.open('O valor do desconto não pode ser maior do que o valor do pedido', '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
    }
    else
      valSum -= valDisc

    this.frmOrderValue = valSum.toString()
  }

  onFormSubmit(valid) {
    if (valid) {
      this.orderObj.products = this.frmOrderProducts
      this.orderObj.orderValidity = this.frmOrderValidity
      this.orderObj.orderDiscount = parseFloat(this.frmOrderDiscount)
      this.orderObj.orderValue = parseFloat(this.frmOrderValue)

      this._appService.postItems('Orders', this.orderObj).subscribe((response: DtoDefaultResponse) => {
        if (response != null) {
          return this.closeDialog(response.responseMessage);
        }
      })
    }
  }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize
    let endIdx = startIdx + event.pageSize

    if (endIdx > event.length)
      endIdx = event.length

    this.pagedResult = this.frmOrderProducts.slice(startIdx, endIdx)
  }

  closeDialog(value?) {
    return this._dialRef.close(value)
  }
}
