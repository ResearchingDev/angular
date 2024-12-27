// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as configData from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/data'; // Backend API URL

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl); // Make GET request to the API
  }

  // userLogin(data: any) {
  //   const headers = { Authorization: configData.API_TOKEN };
  //   const body = data;
  //   return this.httpClient.get(configData.API_URL + 'userLogin', body, { headers });
  // }
}
