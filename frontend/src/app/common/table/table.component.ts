import { Component,Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() tableHeaders: string[] = []; // For <th> values
  @Input() tableData: any[] = [];       // For <td> values (array of rows)
  @Input() dtoptions: any;
}
