import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = "https://conference-management-backend-rjzd.onrender.com/api/ai";

  constructor(private http: HttpClient) {}

  generateEmail(data: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/generate`, data);

  }

}