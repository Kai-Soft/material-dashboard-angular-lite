import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { UserService } from './user/user.service';
import { BussinessPartnerService } from './bussiness-partner/bussiness-partner.service';
import { CustomerService } from './customer/customer.service';
import { TechnicalService } from './technical/technical.service';
import { OrderService } from './order/order.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    BussinessPartnerService,
    CustomerService,
    TechnicalService,
    OrderService
  ]
})
export class ServicesModule { }
