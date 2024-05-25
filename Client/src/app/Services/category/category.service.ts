import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../Models/user';
import {Observable} from 'rxjs';
import {Category} from '../../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.api + 'categories');
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.api + 'catagory/' + id);
  }

  save(category: Category): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.api + 'category', category, {headers: this.headers});
  }

  update(category: Category): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.api + 'category', category, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.api + 'category/' + id, {headers: this.headers});
  }
}
