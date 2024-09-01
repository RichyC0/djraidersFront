import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './models/categories.models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  protected categories: Category[];
  protected keys: string[];

  constructor(private categoryService: CategoryService) {
    this.categories = [];
    this.keys = ['name', 'description'];
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((payload: Category[]) => this.categories = payload);
  }

}
