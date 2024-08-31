import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule(
  {
    imports: [
      CommonModule,
      RouterModule,
      MaterialModule
    ],
    exports: [
      MaterialModule
    ]
  }
)
export class SharedModule { }
