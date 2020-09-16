import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Order, OrderModel } from 'src/app/models/order.interface';
import { Product } from 'src/app/models/product.interface';
import { SelectedProductsList, SelectedProductsListModel } from 'src/app/models/selected-products-list.interface';
import { SelectedProducts } from 'src/app/models/selected-products.interface';
import { AppService } from 'src/app/services/app.service';
import { ListProductsComponent } from '../list-products/list-products.component';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  orderObj: Order = new OrderModel()
  pagedResult: Array<Product>

  frmOrderId: number
  frmOrderValue: string
  frmOrderDiscount: string
  frmOrderValidity: string
  frmOrderProducts: Array<Product> = new Array<Product>()

  selectedProducts: SelectedProductsList = new SelectedProductsListModel()

  constructor(@Inject(MAT_DIALOG_DATA) public _data: Order, private _dialRef: MatDialogRef<UpdateOrderComponent>, private _dial: MatDialog, private _msg: MatSnackBar, private _appService: AppService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.firstLoad(this._data)
  }

  firstLoad(value: Order) {
    this.frmOrderDiscount = value.orderDiscount.toString();
    this.frmOrderValue = value.orderValue.toString();
    this.frmOrderValidity = this.datepipe.transform(value.orderValidity, 'dd/MM/yyyy')
    this.frmOrderProducts = value.products
    this.frmOrderId = value.orderId

    this.pagedResult = this.frmOrderProducts.slice(0, 5)
  }

  addProduct() {
    let orderProducts = new Array<SelectedProducts>()
    this.frmOrderProducts.forEach(item => orderProducts[orderProducts.length] = { productId: item.productId, productName: item.productName, productValue: item.productValue, productSelected: true })
    this.selectedProducts.selectedProducts = orderProducts

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
      this.orderObj.orderDiscount = parseFloat(this.frmOrderDiscount)
      this.orderObj.orderValue = parseFloat(this.frmOrderValue)
      this.orderObj.orderId = this.frmOrderId

      this._appService.putItems('Orders', this.orderObj).subscribe((response: DtoDefaultResponse) => {
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
