import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/product.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent
  },
  {
    path: 'category',
    component: CategoriesComponent
  },
  {
    path: 'product',
    component: ProductsComponent
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class StoreRountingModule { }
