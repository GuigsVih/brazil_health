import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.http.post(`${this.url}/me`, environment.httpOptions);
  }

  insertCredits(credits: number, id: number) {
    return this.http.put(`${this.url}/admin/credits/${id}`, {credits: credits});
  }
}
