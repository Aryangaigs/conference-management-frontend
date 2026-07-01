import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = 'http://localhost:8000/api/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCampaign(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCampaign(campaign: Campaign): Observable<any> {
    return this.http.post(this.apiUrl, campaign);
  }

  updateCampaign(id: string, campaign: Campaign): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, campaign);
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
