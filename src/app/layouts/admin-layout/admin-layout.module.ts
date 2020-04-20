import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { ServicesModule } from '../../services/services.module';

// Pages
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { BussinessPartnerComponent } from '../../pages/bussiness-partner/bussiness-partner.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { TechnicalComponent } from '../../pages/technical/technical.component';
import { OrderComponent } from '../../pages/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ServicesModule
  ],
  declarations: [
    UserProfileComponent,
    DashboardComponent,
    BussinessPartnerComponent,
    CustomerComponent,
    TechnicalComponent,
    OrderComponent
  ]
})

export class AdminLayoutModule {}
