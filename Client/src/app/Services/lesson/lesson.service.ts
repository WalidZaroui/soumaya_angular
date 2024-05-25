import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../../Models/course';
import {Lesson} from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.api + 'lessons');
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.api + 'lesson/' + id);
  }

  findByCourseId(id: string): Observable<any> {
    return this.http.get(this.api + 'lesson/course/' + id);
  }

  save(lesson: Lesson): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.api + 'lesson', lesson, {headers: this.headers});
  }

  update(lesson: Lesson): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.api + 'lesson', lesson, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.api + 'lesson/' + id, {headers: this.headers});
  }
}
