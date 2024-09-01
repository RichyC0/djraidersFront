import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/sidenav.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  protected menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      {
        label: 'Usuarios',
        icon: 'groups',
        route: 'user',
      },
      {
        label: 'Productos',
        icon: 'shop',
        route: 'store/product'
      },
      {
        label: 'Inventario',
        icon: 'inventory',
        route: 'store'
      }

    ]
  }

  ngOnInit() {
  }

}
