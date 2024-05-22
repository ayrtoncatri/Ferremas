import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMessage() {
    return this.http.get(`${this.baseUrl}/message`, { responseType: 'text' });
  }
}
