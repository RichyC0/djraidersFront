import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Generic } from 'src/app/store/models/global.models';
import { SizeTypeService } from 'src/app/store/services/size-type.service';
import Swal from 'sweetalert2';
import { SizeType } from '../../../products/models/sizeType.models';
import { CategoryModel } from '../../models/categories.models';
import { CategoryService } from '../../services/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})
export class DetailCategoryComponent implements OnInit {
  protected formGroup: FormGroup;
  protected sizeTypes: SizeType[];
  protected category: CategoryModel;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private sizeTypeService: SizeTypeService,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Generic
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategory();
    this.getSizeTypes();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group(
      {
        name: new FormControl('', Validators.compose([Validators.required])),
        sizeType_id: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required]))
      }
    );
  }

  private getCategory(): void {
    this.categoryService.getCategory(this.data.id as string).subscribe((category: CategoryModel) => {
      this.category = category;
      this.formGroup.patchValue(this.category);
    });
  }

  private getSizeTypes(): void {
    this.sizeTypeService.getAllSizeTyper().subscribe((data: SizeType[]) => { this.sizeTypes = data });
  }

  private formHasChanges(): boolean {
    const changes: boolean[] = Object.entries(this.formGroup.getRawValue()).map(([key, value]) => value !== this.category[key]);
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
      const category: CategoryModel = this.formGroup.getRawValue();
      this.categoryService.updateCategory(category, this.data.id as string).subscribe(() => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Categoria actualizada!',
            text: 'La categoria se ha actualizado correctamente'
          }
        ).then(() => this.dialogRef.close());
      });
    }
  }

  protected validateFields(field: string): boolean {
    const control: AbstractControl = this.formGroup.get(field);
    return (control?.dirty || control?.touched) && !!control?.errors;
  }

  private get messages(): Record<string, string> {
    const errors: Record<string, string> = {
      required: 'Este campo es requerido',
      pattern: 'El campo es solo númerico'
    };
    return errors;
  }

}
