import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Generic } from '../../models/global.models';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { Product } from './models/product.models';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductsComponent implements OnInit {

  protected products: Product[];
  protected keys: string[];


  constructor(private productService: ProductService, public dialog: MatDialog,  private router: Router) {
    this.keys = ['categoryName', 'name', 'color', 'price', 'state', 'edit'];
    this.products = [];
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => { this.products = data });
  }

  protected viewProduct(product: Product): void {
    const data: Generic = {
      id: product.uuid
    };
    const dialogRef = this.dialog.open(DetailProductComponent,
      {
        data: data,
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllProducts());
  }

  protected createProduct(): void {
    const dialogRef = this.dialog.open(CreateProductComponent,
      {
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllProducts());
  }

  protected redirect(): void {
    this.router.navigateByUrl('dashboard/store/category', { replaceUrl: true });
  }

}
