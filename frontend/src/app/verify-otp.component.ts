// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from './services/auth.service';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-verify-otp',
//   standalone:  true,
//   templateUrl: './verify-otp.component.html',
//   imports: [FormsModule,
//     ReactiveFormsModule, CommonModule, RouterModule],
// })
// export class VerifyOtpComponent {
//   otpForm: FormGroup;
//   userId: string;
//   otpError: string = '';
//   timer: number = 300; // 5 minutes in seconds
// displayTime: string = '05:00';
// intervalId: any;

// constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//   this.otpForm = this.fb.group({ userId: '', otp: '' });
//   const nav = this.router.getCurrentNavigation();
//   this.userId = nav?.extras.state?.['userId'];
// }

// ngOnInit() {
//   this.startTimer();
// }

// startTimer() {
//   this.updateDisplayTime();
//   this.intervalId = setInterval(() => {
//     if (this.timer > 0) {
//       this.timer--;
//       this.updateDisplayTime();
//     } else {
//       clearInterval(this.intervalId);
//       this.otpError = 'OTP expired. Please request a new one.';
//     }
//   }, 1000);
// }

// updateDisplayTime() {
//   const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
//   const seconds = (this.timer % 60).toString().padStart(2, '0');
//   this.displayTime = `${minutes}:${seconds}`;
// }

//   onSubmitOtp() {
//     this.authService.verifyOtp({ userId: this.userId, otp: this.otpForm.value.otp }).subscribe({
//       next: res => {
//         if (res.success) {
//           localStorage.setItem('token', res.token);
//           localStorage.setItem('user', JSON.stringify(res.user));
//           this.router.navigate(['/dashboard']);
//         } else {
//           this.otpError = 'Invalid OTP. Please try again.';
//         }
//       },
//       error: err => {
//         this.otpError = err.error?.error || 'Something went wrong. Try again.';
//       }
//     });
//   }
// }
