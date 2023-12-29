import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    return;
  }

  register(data: any) {}

  logout() {
    localStorage.removeItem('user');
    return;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
