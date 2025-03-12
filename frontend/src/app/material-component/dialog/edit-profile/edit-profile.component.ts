


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  selectedFile: File | null = null; // To store the selected file
  imagePreview: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      id: [data?.id, Validators.required], // User ID (hidden)
      name: [data?.name, Validators.required],
      contactNumber: [data?.contactNumber, [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: [data?.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  // Handle file selection
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {  // 10 MB limit
        alert('File size exceeds the limit of 10MB');
        return;
      }
      this.selectedFile = file;
  
      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      return;
    }

    this.ngxService.start();

    // Create a FormData object to send the form data and file
    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('contactNumber', this.profileForm.value.contactNumber);
    formData.append('email', this.profileForm.value.email);

    if (this.selectedFile) {
      formData.append('profilePhoto', this.selectedFile);
    }

    this.userService.updateProfile(formData).subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log("API Response:", response); // Debugging: Log the response

        if (response.user) {
          // Update the local user data with the response
          this.user = response.user;
          this.snackbarService.openSnackBar("Profile updated successfully", "success");
          this.dialogRef.close(this.user); // Pass the updated data back to the parent component
        } else {
          console.error("Invalid response format: 'user' property missing");
          this.snackbarService.openSnackBar("Failed to update profile", "error");
        }
      },
      (error: any) => {
        this.ngxService.stop();
        console.error("API Error:", error); // Debugging: Log the error
        const message = error.error?.message || "Something went wrong!";
        this.snackbarService.openSnackBar(message, "error");
      }
    );
  }
}



// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { Router } from '@angular/router'; // <-- Import Router

// @Component({
//   selector: 'app-edit-profile',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.scss']
// })
// export class EditProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   user:any;
  
//   constructor(
//     public dialogRef: MatDialogRef<EditProfileComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder,
//     private userService: UserService,
//     private snackbarService: SnackbarService,
//     private ngxService: NgxUiLoaderService,
//     private router: Router
//   ) {
//     this.profileForm = this.fb.group({
//       id: [data?.id, Validators.required], // User ID (hidden)
//       name: [data?.name, Validators.required],
//       contactNumber: [data?.contactNumber, [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
//       email: [data?.email, [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit(): void {}

//   // updateProfile() {
//   //   if (this.profileForm.invalid) {
//   //     return;
//   //   }
//   //   this.ngxService.start();
//   //   this.userService.updateProfile(this.profileForm.value).subscribe(
//   //     (response: any) => {
//   //       this.ngxService.stop();
//   //       this.snackbarService.openSnackBar("Profile updated successfully", "success");
//   //       this.dialogRef.close();
//   //       setTimeout(() => {
//   //         this.router.navigate(['/login']);
//   //       }, 300);
//   //     },
//   //     (error: any) => {
//   //       this.ngxService.stop();
//   //       const message = error.error?.message || "Something went wrong!";
//   //       this.snackbarService.openSnackBar(message, "error");
//   //     }
//   //   );
//   // }

//   updateProfile() {
//     if (this.profileForm.invalid) {
//       return;
//     }
//     this.ngxService.start();
//     this.userService.updateProfile(this.profileForm.value).subscribe(
//       (response: any) => {
//         this.ngxService.stop();
//         console.log("API Response:", response); // Debugging: Log the response
  
//         if (response.user) {
//           // Update the local user data with the response
//           this.user = response.user;
//           this.snackbarService.openSnackBar("Profile updated successfully", "success");
//         } else {
//           console.error("Invalid response format: 'user' property missing");
//           this.snackbarService.openSnackBar("Failed to update profile", "error");
//         }
//       },
//       (error: any) => {
//         this.ngxService.stop();
//         console.error("API Error:", error); // Debugging: Log the error
//         const message = error.error?.message || "Something went wrong!";
//         this.snackbarService.openSnackBar(message, "error");
//       }
//     );
//   }
// }
