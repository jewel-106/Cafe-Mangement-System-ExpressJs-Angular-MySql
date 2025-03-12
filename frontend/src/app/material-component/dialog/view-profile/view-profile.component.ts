import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';



@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  user: any = {}; // Initialize with an empty object
  responseMessage: any;
  dataSource: any[] = [];
  displayedColumns: string[] = ['name', 'contactNumber', 'email', 'password', 'status', 'role'];

  constructor(
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarServic: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserDetails().subscribe(
      (response: any) => {
        this.ngxService.stop();
        if (response) {
          this.user = response;
          console.log("this user hase: ",this.user) // Assuming the response contains user data
          this.dataSource = [response]; // If the response is a single user object
        }
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarServic.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  viewProfile(user: any) {
    console.log('View Profile:', user);
  }

  // editProfile() {
  //   const dialogRef = this.dialog.open(EditProfileComponent, {
  //     width: '450px',
  //     data: this.user
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadUserProfile(); // Refresh profile after update
  //     }
  //   });
  // }


  editProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '450px',
      data: this.user // Pass the current user data to the dialog
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the local user data with the result
        this.user = result;
        this.dataSource = [result]; // Update the dataSource for the table
      }
    });
  }

  deleteAccount() {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   data: {
    //     message: 'Are you sure you want to delete your account?',
    //     confirmText: 'Delete',
    //     cancelText: 'Cancel'
    //   }
    // });
  
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     // Call the API to delete the account
    //   }
    // });
  }
 

  changePassword() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '550px';
      this.dialog.open(ChangePasswordComponent, dialogConfig);
    }
}
