import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from './services/requests.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainflightsComponent } from './mainflights/mainflights.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FlightsComponent } from './mainflights/flights/flights.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuccessComponent } from './success/success/success.component';
import { ErrorComponent } from './error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    MainflightsComponent,
    FlightsComponent,
    SidebarComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [RequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
