import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule,
    RouterModule
    // other standalone imports like FormsModule, ReactiveFormsModule, etc.
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  otpForm: FormGroup;
  isOtpStep = false;
  userId: string = '';
  errorMessage: string = '';
  otpError = '';
  timer: number = 300;
  displayTime: string = '05:00';
  intervalId: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({ email: '', password: '' });
    this.otpForm = this.fb.group({ otp: '' });
  }

  onSubmitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        if (res.requireOtp) {
          this.isOtpStep = true;
          this.userId = res.userId;
          this.startTimer();
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Login failed. Please try again.';
      }
    });
  }

  onSubmitOtp() {
    this.authService.verifyOtp({ userId: this.userId, otp: this.otpForm.value.otp }).subscribe({
      next: res => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
        } else {
          this.otpError = 'OTP verification failed';
        }
      },
      error: err => {
        this.otpError = err.error?.error || 'OTP verification failed';
      }
    });
  }

  startTimer() {
    this.updateDisplayTime();
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.intervalId);
        this.otpError = 'OTP expired. Please login again.';
      }
    }, 1000);
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
    const seconds = (this.timer % 60).toString().padStart(2, '0');
    this.displayTime = `${minutes}:${seconds}`;
  }
}