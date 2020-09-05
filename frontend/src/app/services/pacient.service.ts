import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  private url = environment.api;
  
  constructor(private http: HttpClient, private httpBackend: HttpBackend) { }  

  getAddress(cep: number) {
    const http = new HttpClient(this.httpBackend);
    return http.get(`https://viacep.com.br/ws/${cep}/json`);
 }

 updateData(data: any, id: number) {
   return this.http.put(`${this.url}/user/${id}`, data);
 }
}
