import { Component, OnInit  ,ViewChild} from '@angular/core';
import { RouterModule ,Router} from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ManageClientService } from 'src/app/services/Manageclient.service';
import { TableComponent } from 'src/app/common/table/table.component';
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
  // @ViewChild(DataTableDirective)
  // dtElement!: DataTableDirective;
  // dtOptions: DataTables.Settings = {};  
  // dtTrigger: Subject<any> = new Subject();

  // Define headers for the table
  headers: string[] = [];

  // Define rows for the table
  body: any[] = [];
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
    console.log('Delete ID:', id);
  }
 
}
