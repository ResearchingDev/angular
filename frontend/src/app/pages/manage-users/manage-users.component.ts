import { Component, OnInit  ,ViewChild} from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ManageClientService } from 'src/app/services/Manageclient.service';
import { TableComponent } from 'src/app/common/table/table.component';
import Swal from 'sweetalert2';

class DataTablesResponse {
  data: any[] | undefined;
  recordsFiltered: number | undefined;
  recordsTotal: number | undefined;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [RouterModule,TableComponent],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})

export class ManageUsersComponent implements OnInit {
  display: boolean = false;
  // @ViewChild(DataTableDirective)
  // dtElement!: DataTableDirective;
  // dtOptions: DataTables.Settings = {};  
  // dtTrigger: Subject<any> = new Subject();

  // Define headers for the table
  headers: string[] = [];

  // Define rows for the table
  body: any[] = [];
  response:any;
  constructor(public ManageClientService:ManageClientService,private router: Router) {}

  ngOnInit(): void {
    this.ManageClientService.getClientDetails().subscribe((response:any)=>{
      this.headers = ['First Name','Last Name','Email','User Role'];
      this.body = response;
    });
  }
  // Method to handle edit action
  onEdit(id: number): void {
    let user_id = Number(id);
    if (typeof user_id == "number") {
      this.router.navigate([`client/edit/${user_id}`]);
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
            // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            //   // Destroy the table first
            //   dtInstance.destroy();
            //   // Call the dtTrigger to rerender again
            //   this.dtTrigger.next();
            // });
            Swal.fire('Deleted', this.response.message, 'success').then(function () {
            });
          }
        });
      }
    });
  }
}
