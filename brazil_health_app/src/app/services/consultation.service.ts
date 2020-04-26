import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  getConsultations(queryParams) {
    return this.http.get(`${this.url}/consultations`, {params: queryParams});
  }

  makeConsult(benefit) {
    return this.http.post(`${this.url}/consultations`, benefit);
  }
}
