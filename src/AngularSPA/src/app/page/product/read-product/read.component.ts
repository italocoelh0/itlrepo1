import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Product, ProductModel } from 'src/app/models/product.interface';
import { AppService } from 'src/app/services/app.service';
import { CreateProductComponent } from '../create-product/create.component';
import { UpdateProductComponent } from '../update-product/update.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadProductComponent implements OnInit {
  productsObj: Array<Product> = new Array<ProductModel>()
  pagedResult: Array<Product>

  constructor(private _msg: MatSnackBar, private _dial: MatDialog, private _appService : AppService) { }

  ngOnInit(): void {
    this.readProducts()
  }

  createProduct() {
    let dial = this._dial.open(CreateProductComponent, { maxWidth: '750px' });
    dial.afterClosed().subscribe(response => {
      if (response == null || response == undefined)
        return;
      else {
        this._msg.open(response, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readProducts()
      }
    });
  }

  readProducts() {
    this._appService.getItems('Products').subscribe((response: Array<Product>) => {
      this.productsObj = response;
      this.pagedResult = this.productsObj.slice(0, 10)
    })
  }

  updateProduct(value: ProductModel) {
    let dial = this._dial.open(UpdateProductComponent, { maxWidth: '750px', data: { ...value } });
    dial.afterClosed().subscribe(response => {
      if (response == null || response == undefined)
        return;
      else {
        this._msg.open(response, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readProducts()
      }
    });
  }

  deleteProduct(value: number) {
    this._appService.deleteItems('Products/'+ value).subscribe((response: DtoDefaultResponse) => {
      if (response != null) {
        this._msg.open(response.responseMessage, '', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' })
        return this.readProducts()
      }
    })
  }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize
    let endIdx = startIdx + event.pageSize

    if (endIdx > event.length)
      endIdx = event.length

    this.pagedResult = this.productsObj.slice(startIdx, endIdx)
  }
}
