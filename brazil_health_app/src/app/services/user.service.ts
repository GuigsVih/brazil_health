import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(queryParams) {
    return this.http.get(`${this.url}/users`, {params: queryParams});
  }

  addUser(user) {
    return this.http.post(`${this.url}/users`, user);
  }

  editUser(user) {
    return this.http.put(`${this.url}/users/${user.id}`, user);
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
}
