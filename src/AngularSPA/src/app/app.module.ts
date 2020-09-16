import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppService } from './services/app.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CreateProductComponent } from './page/product/create-product/create.component';
import { UpdateProductComponent } from './page/product/update-product/update.component';
import { ReadProductComponent } from './page/product/read-product/read.component';
import { IndexComponent } from './page/index/index.component';
import { AboutComponent } from './page/about/about.component';
import { CreateOrderComponent } from './page/order/create-order/create-order.component';
import { ReadOrderComponent } from './page/order/read-order/read-order.component';
import { UpdateOrderComponent } from './page/order/update-order/update-order.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ListOrderProductsComponent } from './page/order/list-order-products/list-order-products.component';
import { ListProductsComponent } from './page/order/list-products/list-products.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ReadProductComponent,
    IndexComponent,
    AboutComponent,
    CreateOrderComponent,
    ReadOrderComponent,
    UpdateOrderComponent,
    ListOrderProductsComponent,
    ListProductsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    CurrencyMaskModule
  ],
  providers: [
    AppService,
    DatePipe,
    {
      provide: CURRENCY_MASK_CONFIG, useValue: {
        align: "center",
        allowNegative: false,
        decimal: ".",
        precision: 2,
        prefix: "R$ ",
        suffix: "",
        thousands: ""
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
