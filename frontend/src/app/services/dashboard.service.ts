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
  getDashboardClientDatagraph(year:any){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = {
      query: `
        query GetDashboardClientData($year: Int!) {
          getDashboardClientData(year: $year) {
            name
            data
          }
        }`,
      variables: { year }
    };
    return this.httpClient.post(configData.API_URL + 'graphql/dashboard', body, { headers: reqHeader });
  }
}
