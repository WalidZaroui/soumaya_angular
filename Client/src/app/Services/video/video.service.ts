import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Video} from '../../Models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  findById(id: string): Observable<any> {
    return this.http.get(this.api + 'video/' + id);
  }

  findAll(): Observable<any> {
    return this.http.get(this.api + 'video');
  }

  findByLessonId(id: string): Observable<any> {
    return this.http.get(this.api + 'video/lesson/' + id);
  }

  save(video: Video): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.api + 'video', video, {headers: this.headers});
  }

  update(video: Video): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.api + 'video', video, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.api + 'video/' + id, {headers: this.headers});
  }
}
