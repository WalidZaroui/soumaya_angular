import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders(); // Initialize headers

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.api + 'user', user);
  }

  getUserByToken(): Observable<any> {
    this.setHeaders();
    return this.http.get<User>(this.api + 'user', { headers: this.headers });
  }

  findAll(): Observable<any[]> {
    this.setHeaders();
    return this.http.get<User[]>(this.api + 'users', { headers: this.headers });
  }

  save(user: User): Observable<any> {
    this.setHeaders();
    return this.http.post<User>(this.api + 'user', user, { headers: this.headers });
  }

  update(user: User): Observable<any> {
    this.setHeaders();
    return this.http.put<User>(this.api + 'user', user, { headers: this.headers });
  }

  delete(id: string): Observable<void> {
    this.setHeaders();
    return this.http.delete<void>(this.api + 'user/' + id, { headers: this.headers });
  }

  private setHeaders(): void {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }
}
