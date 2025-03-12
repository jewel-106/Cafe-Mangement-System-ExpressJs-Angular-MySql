import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  
  forgotPasswordForm: FormGroup = new FormGroup({});
  responseMessage: string = '';
  step: number = 1; // Step 1: Email, Step 2: OTP, Step 3: New Password

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.step = 1; // Start with email input
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.emailRegex), // Email validation
        ],
      ],
      otp: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
    });
    this.forgotPasswordForm.valueChanges.subscribe(() => {
      this.forgotPasswordForm.updateValueAndValidity();
    });
  }

  handleSubmit() {
    this.ngxService.start();

    if (this.step === 1) {
      // Send OTP to email
      this.userService.forgotPassword({ email: this.forgotPasswordForm.value.email }).subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.snackBarService.openSnackBar(this.responseMessage, '');
          this.step = 2; // Move to OTP step
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
    else if (this.step === 2) {
      // Get the OTP entered by the user
      const enteredOtp = this.forgotPasswordForm.value.otp;
    
      // Verify OTP
      console.log('OTP: ', this.forgotPasswordForm.value.otp);
  console.log('Email: ', this.forgotPasswordForm.value.email);
      this.userService.verifyOtp({
        email: this.forgotPasswordForm.value.email,
        otp: enteredOtp,  // Use the dynamic OTP value
      }).subscribe(
        (response: any) => {
          console.log('OTP Verification Response:', response);  // Log response to check
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.snackBarService.openSnackBar(this.responseMessage, '');
          this.step = 3; // Move to password reset step
        },
        (error) => {
          console.log('OTP Verification Error:', error);  // Log error to check
          this.handleError(error);
        }
      );
    } 
     else if (this.step === 3) {
      // Set new password
      this.userService.resetPassword({
        email: this.forgotPasswordForm.value.email,
        otp: this.forgotPasswordForm.value.otp,
        newPassword: this.forgotPasswordForm.value.newPassword,
      }).subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.snackBarService.openSnackBar(this.responseMessage, '');
          this.dialogRef.close();
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  handleError(error: any) {
    this.ngxService.stop();
    this.responseMessage = error.error?.message || GlobalConstants.genericError;
    this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
  }
}
