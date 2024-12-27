// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as configData from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  userLogin(data: any) {
    const headers = { Authorization: configData.API_TOKEN };
    const body = data;
    return this.httpClient.post(configData.API_URL + 'userLogin', body, { headers });
  }
}
