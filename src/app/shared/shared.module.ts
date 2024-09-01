import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule(
  {
    declarations: [
      CapitalizePipe,
    ],
    imports: [
      CommonModule,
      RouterModule,
      MaterialModule
    ],
    exports: [
      MaterialModule,
      CapitalizePipe
    ]
  }
)
export class SharedModule { }
