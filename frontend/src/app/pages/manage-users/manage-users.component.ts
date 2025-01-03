import { Component, OnInit  ,ViewChild} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ManageClientService } from 'src/app/services/Manageclient.service';

class DataTablesResponse {
  data: any[] | undefined;
  recordsFiltered: number | undefined;
  recordsTotal: number | undefined;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})

export class ManageUsersComponent implements OnInit {
  // @ViewChild(DataTableDirective)
  // dtElement!: DataTableDirective;
  // dtOptions: DataTables.Settings = {};  
  // dtTrigger: Subject<any> = new Subject();
  constructor(public ManageClientService:ManageClientService) {}

  ngOnInit(): void {
    this.ManageClientService.getClientDetails().subscribe((data:any)=>{
      console.log(data);
    });
  }

 
}
