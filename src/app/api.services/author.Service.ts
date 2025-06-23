import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://foodlabbackend.onrender.com'; 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials);
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    
    // console.log(token)
  }
  storeUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUSer(){
    return localStorage.getItem('user')
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

 changePassword(body:any):Observable<any>{
   return this.http.post(`${this.baseUrl}/change-password`,body)
  }
}
