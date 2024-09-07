import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Generic } from '../../models/global.models';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { DetailCategoryComponent } from './components/detail-category/detail-category.component';
import { Category } from './models/categories.models';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  protected categories: Category[];
  protected keys: string[];

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
    this.categories = [];
    this.keys = ['name', 'description', 'edit'];
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((payload: Category[]) => this.categories = payload);
  }

  protected viewCategory(category: Category): void {
    const data: Generic = {
      id: category.uuid
    };
    const dialogRef = this.dialog.open(DetailCategoryComponent,
      {
        data: data,
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllCategories());
  }

  protected createCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent,
      {
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllCategories());
  }

}
