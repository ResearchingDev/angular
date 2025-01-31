import { Component,Input,Output,EventEmitter,AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{
  @Input() tableHeaders: string[] = []; // For <th> values
  @Input() tableData: any[] = [];       // For <td> values (array of rows)
  @Input() dtOptions:  any = {};
  @Input() show: boolean = false;
  
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild('usersTable', { static: false }) table!: ElementRef;  //Capture table reference
  ngOnInit(){}
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.table || !this.table.nativeElement) {
        console.error('Table element not found!');
        return;
      }
      const tableElement = $(this.table.nativeElement);
      if (this.dtOptions && Object.keys(this.dtOptions).length > 0) {
        tableElement.DataTable(this.dtOptions);
      } else {
        console.error('DataTable options are empty. Rendering static table.');
      }
    }, 500);
  }
  // Emit the selected ID when edit is clicked
  onEdit(id: number): void {
    this.edit.emit(id);  // Emit the ID to the parent component
  }
  // Emit the selected ID when delete is clicked
  onDelete(id: any): void {
    this.delete.emit(id);  // Emit the ID to the parent component
  }
  reloadTable(): void {
    $(this.table.nativeElement).DataTable().ajax.reload(); // Reload DataTable
  }
}
