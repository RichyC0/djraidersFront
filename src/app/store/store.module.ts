import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/components/create-category/create-category.component';
import { DetailCategoryComponent } from './categories/components/detail-category/detail-category.component';
import { CreateProductComponent } from './products/components/create-product/create-product.component';
import { DetailProductComponent } from './products/components/detail-product/detail-product.component';
import { ProductsComponent } from './products/product.component';
import { StoreRountingModule } from "./store-routing.module";
import { StoreComponent } from './store.component';

@NgModule(
  {
    declarations: [
      CategoriesComponent,
      CreateCategoryComponent,
      DetailCategoryComponent,
      StoreComponent,
      ProductsComponent,
      CreateProductComponent,
      DetailProductComponent
    ],
    imports: [
      CommonModule,
      StoreRountingModule,
      SharedModule
    ]
  }
)
export class StoreModule { }
