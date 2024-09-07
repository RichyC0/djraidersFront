import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Generic } from 'src/app/store/models/global.models';
import { UserModel } from '../../models/user.models';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailUserComponent implements OnInit {

  protected formGroup: FormGroup;
  protected user: UserModel;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<DetailUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Generic
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.getUser();
    // this.subscriptions();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group(
      {
        firstName: new FormControl('', Validators.compose([Validators.required])),
        secondName: new FormControl('', Validators.compose([Validators.required])),
        lastName: new FormControl('', Validators.compose([Validators.required])),
        surName: new FormControl('', Validators.compose([Validators.required])),
        documentNumber: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.compose([Validators.required])),
        documentype_Id: new FormControl('', Validators.compose([Validators.required])),
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


  private formHasChanges(): boolean {
    const changes: boolean[] = Object.entries(this.formGroup.getRawValue()).map(([key, value]) => this.user[key] !== value);
    return changes.some((change: boolean) => change);
  }

  private get messages(): Record<string, string> {
    const errors: Record<string, string> = {
      required: 'Este campo es requerido'
    };
    return errors;
  }


}
