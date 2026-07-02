import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Journey } from '../models/journey';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private apiUrl = "https://conference-management-backend-rjzd.onrender.com/api/journeys";

  constructor(
    private http: HttpClient
  ) {}

  // Get All Journeys
  getJourneys(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

  // Get Single Journey
  getJourney(id: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/${id}`);

  }

  // Create Journey
  createJourney(journey: Journey): Observable<any> {

    return this.http.post(this.apiUrl, journey);

  }

  // Update Journey
  updateJourney(
    id: string,
    journey: Journey
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      journey

    );

  }

  // Delete Journey
  deleteJourney(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}