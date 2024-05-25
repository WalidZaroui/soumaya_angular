import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../Models/category';
import {Course} from '../../Models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders(); // Initialize headers
  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.api + 'courses');
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.api + 'course/' + id);
  }

  findByCategoryId(id: string): Observable<any> {
    return this.http.get(this.api + 'courses/' + id);
  }

  save(course: Course): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.api + 'course', course, {headers: this.headers});
  }

  update(category: Course): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.api + 'course', category, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer' + localStorage.getItem('token')});
    return this.http.delete(this.api + 'course/' + id, {headers: this.headers});
  }
  getTrainerCourses(): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.api + 'courses/publisher', {headers: this.headers});
  }
  buyCourse(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.api + 'course/buy/' + id, {headers: this.headers});
  }
}
