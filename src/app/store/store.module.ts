import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CreateCategoryComponent } from "./components/categories/components/create-category/create-category.component";
import { DetailCategoryComponent } from "./components/categories/components/detail-category/detail-category.component";
import { CreateProductComponent } from "./components/products/components/create-product/create-product.component";
import { DetailProductComponent } from "./components/products/components/detail-product/detail-product.component";
import { ProductsComponent } from "./components/products/product.component";
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
