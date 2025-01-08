import { Component,Input,Output,EventEmitter} from '@angular/core';
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

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // Emit the selected ID when edit is clicked
  onEdit(id: number): void {
    this.edit.emit(id);  // Emit the ID to the parent component
  }

  // Emit the selected ID when delete is clicked
  onDelete(id: any): void {
    this.delete.emit(id);  // Emit the ID to the parent component
  }
}
