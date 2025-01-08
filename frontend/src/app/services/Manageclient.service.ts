// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as configData from '../../config';
var API_TOKEN = localStorage.getItem('api_token');

@Injectable({
  providedIn: 'root',
})
export class ManageClientService {
  constructor(private httpClient: HttpClient) {}
  getClientDetails(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    return this.httpClient.get(configData.API_URL+ 'getClient' ,{headers : reqHeader});
  }
  addClient(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = data;
    return this.httpClient.post(configData.API_URL+ 'addClient' , body, {headers : reqHeader});
  }
  getClientDetailById(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = {
      'user_id': data
    };
    return this.httpClient.post(configData.API_URL+'getClientDetailById',body,{headers : reqHeader})
  }
  editClient(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = data;
    return this.httpClient.post(configData.API_URL+ 'editClient' , body, {headers : reqHeader});
  }
  deleteClient(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = data;
    return this.httpClient.post(configData.API_URL+ 'deleteClient' , body, {headers : reqHeader});
  }
}
