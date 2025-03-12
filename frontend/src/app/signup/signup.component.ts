import { Router } from '@angular/router';
import { SnackbarService } from './../services/snackbar.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  responseMessage!: string;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

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

  // handleSubmit(): void {
  //   if (!this.signupForm.valid) {
  //     console.log('Form is invalid');
  //     return;
  //   }

  //   this.ngxService.start();
  //   const formData = new FormData();
  //   formData.append("name", this.signupForm.value.name);
  //   formData.append("email", this.signupForm.value.email);
  //   formData.append("contactNumber", this.signupForm.value.contactNumber);
  //   formData.append("password", this.signupForm.value.password);
  //   if (this.selectedFile) {
  //     formData.append("profile_photo", this.selectedFile, this.selectedFile.name);
  //   }

  //   this.userService.signup(formData).subscribe(
  //     (response: any) => {
  //       this.ngxService.stop();
  //       this.dialogRef.close();
  //       this.responseMessage = response?.message;
  //       this.snackbarService.openSnackBar(this.responseMessage, '');
  //       this.router.navigate(['/']);
  //     },
  //     (error) => {
  //       this.ngxService.stop();
  //       console.error('Error during signup:', error);
  //       this.responseMessage = error.error?.message || GlobalConstants.genericError;
  //       this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
  //     }
  //   );
  // }

  handleSubmit(): void {
    if (!this.signupForm.valid) {
      console.log('Form is invalid');
      return;
    }
  
    this.ngxService.start();
    const formData = new FormData();
    formData.append("name", this.signupForm.value.name);
    formData.append("email", this.signupForm.value.email);
    formData.append("contactNumber", this.signupForm.value.contactNumber);
    formData.append("password", this.signupForm.value.password);
    if (this.selectedFile) {
      formData.append("profile_photo", this.selectedFile, this.selectedFile.name); // Ensure this matches the server's expected field name
    }
  
    // Log FormData for debugging
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  
    this.userService.signup(formData).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.router.navigate(['/']);
      },
      (error) => {
        this.ngxService.stop();
        console.error('Error during signup:', error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
