import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Product, ProductModel } from 'src/app/models/product.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateProductComponent implements OnInit {
  productObj : Product = new ProductModel()

  frmPId : string
  frmPName : string
  frmPValue : string

  constructor(@Inject(MAT_DIALOG_DATA) public _data: Product, private _dialRef: MatDialogRef<UpdateProductComponent>, private _appService: AppService) { }

  ngOnInit(): void {
    this.frmPId = this._data.productId.toString()
    this.frmPName = this._data.productName
    this.frmPValue = this._data.productValue.toString()
  }

  onFormSubmit(valid) {
    if (valid) {
      this.productObj.productId = parseInt(this.frmPId)
      this.productObj.productName = this.frmPName
      this.productObj.productValue = parseFloat(this.frmPValue)

      this._appService.putItems('Products', this.productObj).subscribe((response: DtoDefaultResponse) => {
        if (response != null) {
          return this.closeDialog(response.responseMessage);
        }
      })
    }

  }

  closeDialog(value?) {
    return this._dialRef.close(value)
  }
}
