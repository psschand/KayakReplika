import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainflightsComponent } from './mainflights/mainflights.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FlightsComponent } from './mainflights/flights/flights.component';
import { SuccessComponent } from './success/success/success.component';
import { ErrorComponent } from './error/error/error.component';


const routes: Routes = [

  { path: '', component: MainflightsComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/success',component: SuccessComponent },
  { path: 'checkout/error',component: ErrorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
