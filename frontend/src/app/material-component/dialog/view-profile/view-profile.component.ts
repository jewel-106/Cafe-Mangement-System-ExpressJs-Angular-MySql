import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewBillProductsComponent } from '../view-bill-products/view-bill-products.component';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements AfterViewInit {


  // displayedColumns:string[]=['name','contactNumber','email','password','status','role'];
  // dataSource:any[] = [];
  // data:any;

  // constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  //   public dialogRef: MatDialogRef<ViewProfileComponent>) { }
  
  //   ngOnInit() {
  //     this.data = this.dialogData.data;
  //   // this.dataSource = JSON.parse(this.dialogData.data.productDetails);
  //   // console.log("dataSource: ",this.dataSource);
  
  //    // Ensure productDetails is parsed correctly
  //     try {
  //       this.dataSource = typeof this.dialogData.data.productDetails === 'string'
  //         ? JSON.parse(this.dialogData.data.productDetails)
  //         : this.dialogData.data.productDetails;
  //     } catch (error) {
  //       console.error('Error parsing productDetails:', error);
  //       this.dataSource = [];
  //     }
  
  //     console.log("dataSource: ", this.dataSource);
  //    }

 
  user:any =[];
  responseMessage: any;
  data:any;
  displayedColumns:string[]=['name','contactNumber','email','password','status','role'];
  dataSource:any[] = [];
  ngAfterViewInit() { }

  constructor(private userService:UserService,private ngxService:NgxUiLoaderService,private snackbarServic:SnackbarService) {
    this.ngxService.start();
    this.dashboardData();
    
  }

  dashboardData(){
    this.userService.getUserDetails().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = response;
      this.user = this.dataSource;
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarServic.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  viewProfile(user: any) {
    console.log('View Profile:', user);
  }

  editProfile() {
    console.log('Edit Profile:');
  }

  deleteProfile(user: any) {
    console.log('Delete Profile:', user);
  }

  deleteAccount(){}
  changePassword(){}

}




// export class DashboardComponent implements AfterViewInit {

//   responseMessage: any;
//   data:any;
//   ngAfterViewInit() { }

//   constructor(private dashboardService:DashboardService,private ngxService:NgxUiLoaderService,private snackbarServic:SnackbarService) {
//     this.ngxService.start();
//     this.dashboardData();
//   }

//   dashboardData(){
//     this.dashboardService.getDetails().subscribe((response:any)=>{
//       this.ngxService.stop();
//       this.data = response;
//     },(error:any)=>{
//       this.ngxService.stop();
//       console.log(error);
//       if(error.error?.message){
//         this.responseMessage = error.error?.message;
//       }
//       else {
//         this.responseMessage = GlobalConstants.genericError;
//       }
//       this.snackbarServic.openSnackBar(this.responseMessage,GlobalConstants.error);
//     })
//   }
// }