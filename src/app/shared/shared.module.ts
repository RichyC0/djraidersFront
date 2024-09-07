import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule(
  {
    declarations: [
      CapitalizePipe,
    ],
    imports: [
      CommonModule,
      RouterModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
      MaterialModule,
      CapitalizePipe,
      FormsModule,
      ReactiveFormsModule
    ]
  }
)
export class SharedModule { }
