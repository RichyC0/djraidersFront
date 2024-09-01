import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ContainerComponent } from './layout/container/container.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ContainerComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'store',
        loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
      }
    ]
  }
];

@NgModule(
  {
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
