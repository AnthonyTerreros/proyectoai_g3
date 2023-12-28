import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  uri: string = environment.BACKEND_URI_V1;

  constructor(private httpClient: HttpClient) {}

  getHistoryByUser(user_id: string): Observable<Evaluacion[]> {
    return this.httpClient.get<Evaluacion[]>(`${this.uri}/history/${user_id}`);
  }

  uploadCalification(data: Evaluacion) {
    return this.httpClient.post(`${this.uri}/evaluacion`, data);
  }
}
