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
  logout() {
    localStorage.removeItem('access_token');
  }
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }
  login(user: User):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, user);
  }

  forgotPass(data: any) {

    return this.http.patch(`${environment.apiUrl}/auth/login/forgot`, data);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getItem(id:any) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  deleteUser(id: any): Observable<User[]> {
    return this.http.delete<User[]>(
      `${environment.apiUrl}/users/${id}`
      
    );
  }
  update(data: User, id: any) {
    return this.http.put(
      `${environment.apiUrl}/users/${id}`,
      data
      
    );
  }
}
