import { Component, OnInit  ,ViewChild} from '@angular/core';
import { RouterModule } from '@angular/router';
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
  constructor(public ManageClientService:ManageClientService) {}

  ngOnInit(): void {
    this.ManageClientService.getClientDetails().subscribe((response:any)=>{
      this.headers = ['First Name','Last Name','Email','Action'];
      this.body = response;
      console.log(this.body);
      console.log(this.headers);

    });
  }

 
}
