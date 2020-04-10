import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { CustomerService } from './customer/customer.service';
import { UserService } from './user/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CustomerService,
    UserService
  ]
})
export class ServicesModule { }
