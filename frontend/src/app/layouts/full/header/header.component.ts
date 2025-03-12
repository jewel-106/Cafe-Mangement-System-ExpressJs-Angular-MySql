import { ConfirmationComponent } from './../../../material-component/dialog/confirmation/confirmation.component';
import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { EditProfileComponent } from 'src/app/material-component/dialog/edit-profile/edit-profile.component';
import { ViewProfileComponent } from 'src/app/material-component/dialog/view-profile/view-profile.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent {
  role: any;
  user: any = {};
  responseMessage: any;
  dataSource: any[] = [];
  
  constructor(private router: Router, private dialog: MatDialog,private userService: UserService,
      private ngxService: NgxUiLoaderService,
      private snackbarServic: SnackbarService) {}

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (user) => {
        dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  viewProfile() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewProfileComponent, dialogConfig);
    // this.router.events.subscribe(() => {
    //   dialogRef.close();
    // });
  }
  
  
}
