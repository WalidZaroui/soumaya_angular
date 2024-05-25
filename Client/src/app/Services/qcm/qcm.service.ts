import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Qcm} from '../../Models/qcm';

@Injectable({
  providedIn: 'root'
})
export class QcmService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) { }

  findById(id: string): Observable<any> {
    return this.http.get(this.api + 'qcm/' + id);
  }

  findByAll(): Observable<any> {
    return this.http.get(this.api + 'qcm/');
  }

  findByLessonId(id: string): Observable<any> {
    return this.http.get(this.api + 'qcm/lesson/' + id);
  }

  save(qcm: Qcm): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.api + 'qcm', qcm, {headers: this.headers});
  }

  update(qcm: Qcm): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.put(this.api + 'qcm', qcm, {headers: this.headers});
  }

  delete(id: string): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.http.delete(this.api + 'qcm/' + id, {headers: this.headers});
  }
}
