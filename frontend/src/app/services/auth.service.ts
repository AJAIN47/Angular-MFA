import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) : Observable<any> {
    console.log('Logging in with credentials:', credentials);
    return this.http.post<any>('http://localhost:3000/api/login', credentials);
  }

  storeSession(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  verifyOtp(data: { userId: string; otp: string }) {
    return this.http.post<any>('http://localhost:3000/api/verify-otp', data);
  }

  register(credentials: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:3000/api/register', credentials);
  }
}