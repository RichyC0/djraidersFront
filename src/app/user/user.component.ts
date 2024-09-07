import { Component, OnInit } from '@angular/core';
import { User} from './models/user.models';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Generic } from '../store/models/global.models';
import { DetailUserComponent } from './components/detail/detail.component';
import { CreateUserComponent } from './components/create-user/create-user.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  protected users: User[];
  protected keys: string[];

  constructor(private userService: UserService, public dialog: MatDialog,  private router: Router) {
    this.keys = [ 'firstName', 'lastName', 'documentNumber', 'role', 'changePassword', 'edit'];
    this.users = [];
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  private getAllUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => { this.users = data });
  }
  protected viewUser(user: User): void {
    const data: Generic = {
      id: user.uuid
    };
    const dialogRef = this.dialog.open(DetailUserComponent,
      {
        data: data,
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllUsers());
  }

  protected createUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent,
      {
        width: '800px',
        disableClose: true,
        enterAnimationDuration: '800ms',
        exitAnimationDuration: '700ms'
      }
    )

    dialogRef.afterClosed().subscribe(() => this.getAllUsers());
  }


}
