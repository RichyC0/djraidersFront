import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailComponent } from './components/detail/detail.component';
import { UserComponent } from './components/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule(
  {
    declarations: [
      UserComponent,
      DetailComponent,
      CreateUserComponent
    ],
    imports: [
      CommonModule,
      UserRoutingModule,
      SharedModule
    ]
  }
)
export class UserModule { }
