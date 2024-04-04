import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
  logout(){
    localStorage.removeItem('access_token')
  }
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }
  login(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, user);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}
