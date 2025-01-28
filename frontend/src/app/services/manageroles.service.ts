import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import * as configData from '../../config';
var API_TOKEN = localStorage.getItem('api_token');

@Injectable({
  providedIn: 'root'
})
export class ManagerolesService {
  constructor(private httpClient: HttpClient) {}
  private getAuthHeaders() {
    const API_TOKEN = localStorage.getItem('api_token'); // Get token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}` // Attach token
    });
  }

  getRoleDetails(dataTablesParameters: any){
     return this.httpClient.post(configData.API_URL + 'getUserRoleData',dataTablesParameters,{ headers: this.getAuthHeaders() });
  }
  getRoleDetailById(data:any){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_TOKEN
    });
    const body = {
      query: `
        query GetRoleDetail($iUserRoleId: String!) {
          getUserRoleById(iUserRoleId: $iUserRoleId) {
            iUserRoleId
            vUserRole
            eStatus
          }
        }
      `,
      variables: {
        iUserRoleId: data,  // Send the role ID as a variable
      },
    };
    return this.httpClient.post(configData.API_URL+'graphql/userRole',body,{headers : reqHeader})
  }

  addRole(roleData: any) {
    const query = {
    query: `mutation {
              addUserRole(vUserRole: "${roleData.vUserRole}", eStatus: "${roleData.eStatus}") {
                iUserRoleId
                vUserRole
                eStatus
              }
            }`};
    return this.httpClient.post(configData.API_URL + 'graphql/userRole',query,{ headers: this.getAuthHeaders() });
  }

  // Edit User Role (GraphQL Mutation)
  editRole(roleData: any) {
    const query = {
      query: `
        mutation {
          updateUserRole(
            iUserRoleId: "${roleData.update_id}",
            vUserRole: "${roleData.vUserRole}",
            eStatus: "${roleData.eStatus}"
          ) {
            iUserRoleId
            vUserRole
            eStatus
          }
        }
      `
    };
    return this.httpClient.post(configData.API_URL + 'graphql/userRole',query,{ headers: this.getAuthHeaders() });
  }
}
