import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SizeTypeService } from 'src/app/store/services/size-type.service';
import { SizeType } from '../../../products/models/sizeType.models';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryModel } from '../../models/categories.models';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  protected formGroup: FormGroup;
  protected sizeTypes: SizeType[];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private sizeTypeService: SizeTypeService,
    public dialogRef: MatDialogRef<CreateCategoryComponent>
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
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

  private getSizeTypes(): void {
    this.sizeTypeService.getAllSizeTyper().subscribe((data: SizeType[]) => { this.sizeTypes = data });
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
      const product: CategoryModel = this.formGroup.getRawValue();
      this.categoryService.createCategory(product).subscribe(() => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Categoria creada!',
            text: 'La categoria se ha creado correctamente'
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
      pattern: 'El campo es solo númerico',
      maxlength: 'El campo debe tener un valor inferior',
      minlength: 'El campo debe tener un valor superior'
    };
    return errors;
  }

}
