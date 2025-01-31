import { Component,ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/common/table/table.component';
import { ManagerolesService } from 'src/app/services/manageroles.service';
import { RouterModule ,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgToastService} from 'ng-angular-popup';
import { Language } from 'src/app/common/centerlized/language.enum';

// Import jQuery and DataTables directly
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-manage-users-role',
  standalone: true,
  imports: [RouterModule,TableComponent,FormsModule],
  templateUrl: './manage-users-role.component.html',
  styleUrl: './manage-users-role.component.scss'
})
export class ManageUsersRoleComponent {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  headers: string[] = ['Role Name','Status'];
  body: any[] = [];
  response:any;
  dtOptions: any = {};
  selectedType: string = 'pos'; 
  show: boolean = true;
  constructor(private toast: NgToastService,public ManagerolesService:ManagerolesService,private router: Router) {}
  
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 50, 100],
      order:[[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        if(this.selectedType == "erp"){
          this.show=true;
          const formData = new FormData();
          Object.keys(dataTablesParameters).forEach(key => {
            formData.append(key, dataTablesParameters[key]);
          });
          this.ManagerolesService.getERPRoleDetails(formData).subscribe((response: any) => {
            var erp_body  = response.data.map((item: any) => ({
              id: item.id,
              role_name: item.role_name,
              status: item.status
            }));
            this.body = erp_body.map((user: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(user));
            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
            });
          });
        }else{
          this.show=true;
          this.ManagerolesService.getRoleDetails(dataTablesParameters).subscribe((response: any) => {
            this.body = response.data.map(user => Object.values(user));
            callback({
              recordsTotal: response.totalRecords,
              recordsFiltered: response.totalRecords,
            });
          });
        }
      },
      columns: [
        { data: 'vUserRole' },
        { data: 'eStatus' },{ data: null }
      ]
    };

    // this.ManagerolesService.getRoleDetails().subscribe((response:any)=>{
    //   this.headers = ['Role Name','Access','Status'];
    //   this.body = response;
    // });
  }

    // Method to handle edit action
    onEdit(id: number): void {
      if (typeof id == "string") {
        this.router.navigate([`role/edit/${id}`]);
      }else{
        this.toast.danger('Invalid ID!', Language.ERROR, 3000);
      }
    }
  
    // Method to handle delete action
    onDelete(id: any): void {
      if (typeof id == "string") {
        Swal.fire({
          title: 'Are you sure want to remove?',
          text: 'You will not be able to recover this record!',
          icon: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          customClass: {
            popup: 'custom-swal-popup',  // Add custom class to the popup
            confirmButton: 'btn btn-primary px-4',  // Custom button for confirm
            cancelButton: 'btn btn-danger ms-2 px-4',  // Custom button for cancel
          }
        }).then((result) => {
          if (result.isConfirmed) {
            var client_id = {'iUserRoleId':id}
            this.ManagerolesService.deleteRole(client_id)
            .subscribe(resp => {
              this.response = resp['data'].deleteUserRole;
              if (this.response.includes("deleted successfully")) {
                this.tableComponent.reloadTable(); 
                Swal.fire('Deleted', this.response.message, 'success').then(function () {
                });
              }
            });
          }
        });
      }else{
        this.toast.danger('Invalid ID!', Language.ERROR, 3000);
      }
    }
    onTypeChange(selected: string) {
      this.selectedType = selected;
      this.tableComponent.reloadTable();
    }
}
