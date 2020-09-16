import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './page/about/about.component';
import { IndexComponent } from './page/index/index.component';
import { ReadOrderComponent } from './page/order/read-order/read-order.component';
import { ReadProductComponent } from './page/product/read-product/read.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'product', component: ReadProductComponent},
  {path: 'order', component: ReadOrderComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
