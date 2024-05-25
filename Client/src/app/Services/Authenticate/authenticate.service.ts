import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Login} from '../../Models/login';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  api = environment.webservice.baseUrl;
  constructor(private http: HttpClient) { }
  public authenticate(login: Login) {
    return this.http.post(this.api + 'login', login);
  }
}

