import {Component, OnInit, ViewChild} from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { ManageClientService } from 'src/app/services/Manageclient.service';
import { TableComponent } from 'src/app/common/table/table.component';
import Swal from 'sweetalert2';


//Import jQuery and DataTables directly
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [RouterModule,TableComponent],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})

export class ManageUsersComponent implements OnInit  {
  @ViewChild(TableComponent) tableComponent!: TableComponent;
  display: boolean = false;
  headers: string[] = ['First Name', 'Last Name', 'Email', 'User Role'];
  dtOptions: any = {};
  // Define rows for the table
  body: any[] = [];
  response:any;
  datas: Object;
  constructor(public ManageClientService:ManageClientService,private router: Router) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 50, 100],
      order:[[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.ManageClientService.getClientDetails(dataTablesParameters).subscribe((response: any) => {
          this.body = response.data.map(user => Object.values(user));
          callback({
            recordsTotal: response.totalRecords,
            recordsFiltered: response.totalRecords,
          });
        });
      },
      columns: [
        { data: 'fname' },
        { data: 'lname' },
        { data: 'email' },
        { data: 'role' },{ data: null }
      ]
    };
  }
  // Method to handle edit action
  onEdit(id: number): void {
    if (typeof id == "string") {
      this.router.navigate([`client/edit/${id}`]);
    } 
  }

  // Method to handle delete action
  onDelete(id: any): void {
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
      if (result.value) {
        var client_id = {'id':id}
        this.ManageClientService.deleteClient(client_id)
        .subscribe(resp => {
          this.response = resp;
          if (this.response.code == 200) {
            this.tableComponent.reloadTable(); 
            Swal.fire('Deleted', this.response.message, 'success').then(function () {
            });
          }
        });
      }
    });
  }
  
}
