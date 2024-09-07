import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  protected formGroup: FormGroup;
  protected brands: Brand[];
  protected sizes: Size[];
  protected categories: Category[];
  protected sizeGenders: SizeGender[];
  protected images: string[] = [];
  protected isDragging: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private sizeService: SizeService,
    private categoryService: CategoryService,
    private sizeGenderService: SizeGenderService,
    public dialogRef: MatDialogRef<CreateProductComponent>
  ) {
    this.isDragging = false;
    this.buildForm();
  }


  ngOnInit(): void {
    this.subscriptions();
    this.buildCategorySubscription();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group(
      {
        name: new FormControl('', Validators.compose([Validators.required])),
        price: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(8), Validators.minLength(4)])),
        color: new FormControl('', Validators.compose([Validators.required])),
        brand_id: new FormControl('', Validators.compose([Validators.required])),
        size_id: new FormControl('', Validators.compose([Validators.required])),
        categoryId: new FormControl('', Validators.compose([Validators.required])),
        sizeGender_id: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required]))
      }
    );
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

  protected create(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const product: ProductModel = this.formGroup.getRawValue();
      this.productService.createProduct(product).subscribe(() => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Producto creado!',
            text: 'El producto se ha creado correctamente'
          }
        ).then(() => this.dialogRef.close());
      });
    }
  }


  protected onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  // Manejamos cuando el cursor sale del área
  protected onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  // Manejamos cuando se sueltan las imágenes
  protected onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files) {
      this.handleFileInput(event.dataTransfer.files);
    }
  }

  protected onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFileInput(files);
  }

  protected handleFileInput(files: FileList) {
    for (let i = 0; i < files.length && i <= 2; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result); // Convertir la imagen a base64 y almacenarla
        };
        reader.readAsDataURL(file);
      }
    }
  }


  private formHasChanges(): boolean {
    const changes: boolean[] = Object.values(this.formGroup.getRawValue()).map((value) => !!value);
    return changes.some((change: boolean) => change);
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

  private get messages(): Record<string, string> {
    const errors: Record<string, string> = {
      required: 'Este campo es requerido',
      pattern: 'El campo es solo númerico',
      maxlength: 'El campo debe tener un valor inferior',
      minlength: 'El campo debe tener un valor superior'
    };
    return errors;
  }

}
