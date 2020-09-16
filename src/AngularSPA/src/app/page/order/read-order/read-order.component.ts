import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Order, OrderModel } from 'src/app/models/order.interface';
import { Product } from 'src/app/models/product.interface';
import { SelectedProductsList, SelectedProductsListModel } from 'src/app/models/selected-products-list.interface';
import { AppService } from 'src/app/services/app.service';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { ListOrderProductsComponent } from '../list-order-products/list-order-products.component';
import { UpdateOrderComponent } from '../update-order/update-order.component';

@Component({
  selector: 'app-read-order',
  templateUrl: './read-order.component.html',
  styleUrls: ['./read-order.component.css']
})
export class ReadOrderComponent implements OnInit {
  ordersObj: Array<Order> = new Array<OrderModel>()
  pagedResult: Array<Order>
  orderProducts: SelectedProductsList = new SelectedProductsListModel()

  constructor(private _msg: MatSnackBar, private _dial: MatDialog, private _appService: AppService) { }

  ngOnInit(): void {
    this.readOrders()
  }

  createOrder() {
    let dial = this._dial.open(CreateOrderComponent, { maxWidth: '750px', minWidth: '500px', maxHeight: '90%' });
    dial.afterClosed().subscribe(response => {
      if (response == null || response == undefined)
        return;
      else {
        this._msg.open(response, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readOrders()
      }
    });
  }

  readOrders() {
    this._appService.getItems('Orders').subscribe((response: Array<Order>) => {
      if (response != null) {
        this.ordersObj = response;
        this.pagedResult = this.ordersObj.slice(0, 10)
      }
    })
  }

  updateOrder(value: Order) {
    let dial = this._dial.open(UpdateOrderComponent, { maxWidth: '750px', minWidth: '500px', maxHeight: '90%', data: { ...value } });
    dial.afterClosed().subscribe(response => {
      if (response == null || response == undefined)
        return;
      else {
        this._msg.open(response, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readOrders()
      }
    });
  }

  deleteOrder(value: number) {
    this._appService.deleteItems('Orders/' + value).subscribe((response: DtoDefaultResponse) => {
      if (response != null) {
        this._msg.open(response.responseMessage, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readOrders()
      }
    })
  }

  showOrderProducts(value: Array<Product>) {
    this.orderProducts.selectedProducts = []
    value.forEach(item => this.orderProducts.selectedProducts[this.orderProducts.selectedProducts.length] = { productId: item.productId, productName: item.productName, productValue: item.productValue, productSelected: true })
    this._dial.open(ListOrderProductsComponent, { maxWidth: '750px', minWidth: '500px', maxHeight: '90%', data: { ...this.orderProducts } });
  }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize
    let endIdx = startIdx + event.pageSize

    if (endIdx > event.length)
      endIdx = event.length

    this.pagedResult = this.ordersObj.slice(startIdx, endIdx)
  }

  validateOrderValidity(value: Order) {
    let productValidityDate = new Date(value.orderValidity)
    let today = new Date()
    let toInvalid = new Date()
    toInvalid.setDate(toInvalid.getDate() + 3)

    if (productValidityDate < today) {
      return 'bg-order-invalid'
    }
    else if (productValidityDate <= toInvalid) {
      return 'bg-order-toinvalid'
    }
    else {
      return 'bg-order-valid'
    }
  }
}
