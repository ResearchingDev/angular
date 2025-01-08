import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as configData from '../../config'
var API_TOKEN = localStorage.getItem('api_token');

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  getDashboardClientData(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization':'Bearer '+API_TOKEN
    })
    var body ={year:data};
    return this.httpClient.post(configData.API_URL+'getDashboardClientData',body,{headers:reqHeader});
  }
}
