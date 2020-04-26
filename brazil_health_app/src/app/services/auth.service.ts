import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  login(values: any) {
    return this.http.post(`${this.url}/login`, values);
  }

  logout() {
    return this.http.post(`${this.url}/logout`, environment.httpOptions);
  }
  getUserByToken(): Observable<any> {
  const userToken = localStorage.getItem(environment.authTokenKey);
      return this.http.post<any>(this.url + '/me', {},  {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + userToken),
        }
      );
  }
}
