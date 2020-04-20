import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icon: string;
    class: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    icon: string;
    type?: string;
}


export const ROUTES: RouteInfo[] = [
    {
      path: '',
      title: 'Dashboard',
      type: 'link',
      icon: 'home',
      class: ''
    },
    {
      path: '/user-profile',
      title: 'User Profile',
      type: 'link',
      icon: 'person',
      class: ''
    },
    {
      path: '',
      title: 'Datos Maestros',
      type: 'sub',
      icon: 'attachment',
      class: '',
      collapse: 'datos-maestros',
      children: [
        { path: '/bussiness-partners', title: 'Socios Comerciales', icon: 'supervisor_account' },
        { path: '/customers', title: 'Clientes', icon: 'work' },
        { path: '/technicians', title: 'Técnicos', icon: 'contact_phone' }
      ]
    },
    {
      path: '/orders',
      title: 'Ordenes de Servicio',
      type: 'link',
      icon: 'ballot',
      class: ''
    },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  ps: any;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
