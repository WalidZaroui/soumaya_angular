import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private api = environment.webservice.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
  }

  upload(file: FormData) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});
    return this.httpClient.post(this.api + 'upload/', file, {headers: this.headers});
  }
}
