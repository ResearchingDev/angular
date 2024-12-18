import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  show: boolean = false;

  inputFields: string[] = [];


  // Method to add a new input field
  addInputField(): void {
    this.inputFields.push('');  // Adds an empty string, representing a new input field
  }

  updateInput(index: number, value: string): void {
    this.inputFields[index] = value; // Update the value at the specified index
  }
  
}
