import { Routes } from '@angular/router';

// Components
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { BussinessPartnerComponent } from '../../pages/bussiness-partner/bussiness-partner.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { TechnicalComponent } from '../../pages/technical/technical.component';
import { OrderComponent } from '../../pages/order/order.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }

    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'bussiness-partners', component: BussinessPartnerComponent },
    { path: 'customers', component: CustomerComponent },
    { path: 'technicians', component: TechnicalComponent },
    { path: 'orders', component: OrderComponent }
];
