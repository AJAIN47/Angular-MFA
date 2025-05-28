import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule, RouterModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: res => {
        this.successMessage = 'Registration successful! Please login.';
        this.router.navigate(['/login']).then(navigated => {
          if (!navigated) {
            console.error('Navigation to login failed');
          }
        });
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}
