import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private url = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  search(queryParams) {    
    return this.http.post(`${this.url}/search`, {params: queryParams});
  }

  loadSomeEnterprises() {
    return this.http.get(`${this.url}/companies`);
  }
}
