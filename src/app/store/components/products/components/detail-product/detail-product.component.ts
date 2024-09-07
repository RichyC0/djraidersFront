import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Generic } from 'src/app/store/models/global.models';
import { BrandService } from 'src/app/store/services/brand.service';
import { SizeGenderService } from 'src/app/store/services/size-gender.service';
import { SizeService } from 'src/app/store/services/size.service';
import Swal from 'sweetalert2';
import { Category } from '../../../categories/models/categories.models';
import { CategoryService } from '../../../categories/services/category.service';
import { Brand } from '../../models/brand.models';
import { ProductModel } from '../../models/product.models';
import { Size } from '../../models/size.models';
import { SizeGender } from '../../models/sizeGender.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  protected formGroup: FormGroup;
  protected product: ProductModel;
  protected brands: Brand[];
  protected sizes: Size[];
  protected categories: Category[];
  protected sizeGenders: SizeGender[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private sizeService: SizeService,
    private categoryService: CategoryService,
    private sizeGenderService: SizeGenderService,
    public dialogRef: MatDialogRef<DetailProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Generic
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getProduct();
    this.subscriptions();
    this.buildCategorySubscription();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group(
      {
        name: new FormControl('', Validators.compose([Validators.required])),
        price: new FormControl('', Validators.compose([Validators.required])),
        color: new FormControl('', Validators.compose([Validators.required])),
        state: new FormControl('', Validators.compose([Validators.required])),
        brand_id: new FormControl('', Validators.compose([Validators.required])),
        size_id: new FormControl('', Validators.compose([Validators.required])),
        categoryId: new FormControl('', Validators.compose([Validators.required])),
        sizeGender_id: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required]))
      }
    );
    this.formGroup.get('state').disable();
  }

  protected close(): void {
    if (this.formHasChanges()) {
      const swalWithBootstrapButtons = Swal.mixin(
        {
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: true
        }
      );
      swalWithBootstrapButtons.fire(
        {
          icon: 'warning',
          title: 'Cambios pendientes',
          text: 'Tienes cambios pendientes, ¿Estas seguro de cerrar?',
          showCancelButton: true,
          cancelButtonText: 'No, cancelar',
          confirmButtonText: 'Si, cerrar!',
          reverseButtons: true
        }
      ).then((result) => { if (result.isConfirmed) { this.dialogRef.close() } });
    } else {
      this.dialogRef.close();
    }
  }

  protected update(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const product: ProductModel = this.formGroup.getRawValue();
      this.productService.updateProduct(product, this.data.id as string).subscribe(() => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Producto actualizado!',
            text: 'El producto se ha actualizado correctamente'
          }
        ).then(() => this.dialogRef.close());
      });
    }
  }

  private getProduct(): void {
    this.productService.getProduct(this.data.id as string).subscribe((product: ProductModel) => {
      this.product = product;
      this.formGroup.patchValue(product);
      this.getSizes(this.product.categoryId);
    });
  }

  protected getErrors(field: string): string {
    const errorMessages: string[] = [];
    Object.entries(this.messages).forEach(([key, value]) => {
      if (this.formGroup.get(field)?.hasError(key)) {
        errorMessages.push(value);
      }
    });
    return errorMessages.at(0);
  }

  private subscriptions(): void {
    this.getBrands();
    this.getCategories();
    this.getSizeGenders();
  }

  private getBrands(): void {
    this.brandService.getAllBrand().subscribe((brands: Brand[]) => this.brands = brands);
  }

  private getSizes(categoryId: string): void {
    this.sizeService.getAllSize(categoryId).subscribe((sizes: Size[]) => this.sizes = sizes);
  }

  private getSizeGenders(): void {
    this.sizeGenderService.getAllSizeGender().subscribe((sizeGenders: SizeGender[]) => this.sizeGenders = sizeGenders);
  }

  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => this.categories = categories);
  }

  private buildCategorySubscription(): void {
    this.formGroup.get('categoryId').valueChanges.subscribe((categoryId: string) => this.getSizes(categoryId));
  }

  protected validateFields(field: string): boolean {
    const control: AbstractControl = this.formGroup.get(field);
    return (control?.dirty || control?.touched) && !!control?.errors;
  }

  private formHasChanges(): boolean {
    const changes: boolean[] = Object.entries(this.formGroup.getRawValue()).map(([key, value]) => this.product[key] !== value);
    return changes.some((change: boolean) => change);
  }

  private get messages(): Record<string, string> {
    const errors: Record<string, string> = {
      required: 'Este campo es requerido'
    };
    return errors;
  }

}
