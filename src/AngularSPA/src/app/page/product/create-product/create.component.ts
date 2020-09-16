import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DtoDefaultResponse } from 'src/app/models/dto-default-response.interface';
import { Product, ProductModel } from 'src/app/models/product.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateProductComponent implements OnInit {
  productObj: Product = new ProductModel()

  frmPId: string
  frmPName: string
  frmPValue: string

  constructor(@Inject(MAT_DIALOG_DATA) public _data: Account, private _dialRef: MatDialogRef<CreateProductComponent>, private _appService: AppService) { }

  ngOnInit(): void {
  }

  onFormSubmit(valid) {
    if (valid) {
      this.productObj.productName = this.frmPName
      this.productObj.productValue = parseFloat(this.frmPValue)

      this._appService.postItems('Products', this.productObj).subscribe((response: DtoDefaultResponse) => {
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
