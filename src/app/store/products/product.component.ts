import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductsComponent implements OnInit {

  protected products: Product[];
  protected keys: string[];

  constructor(private productService: ProductService) {
    this.keys = ['categoryName', 'name', 'color', 'price', 'state', 'edit', 'view'];
    this.products = [];
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => { this.products = data });
  }

}
