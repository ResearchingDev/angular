import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  formGroup: FormGroup;
  formSubmitted = false; // Flag to track submission state
  editingRowIndex: number | null = null; // Track the index of the row being edited

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  get fields(): FormArray {
    return this.formGroup.get('fields') as FormArray;
  }

  addInputField(): void {
    const fieldGroup = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.fields.push(fieldGroup);
  }

  removeInputField(index: number): void {
    this.fields.removeAt(index);
  }

  editInputField(index: number): void {
    this.editingRowIndex = index; // Set the row index being edited
  }

  saveInputField(index: number): void {
    if (this.fields.at(index).valid) {
      console.log('Updated Field:', this.fields.at(index).value);
      this.editingRowIndex = null; // Reset the editing index after saving
    } else {
      console.log('Invalid input in row:', index);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmitted = true; // Toggle the formSubmitted flag
      console.log('Form Values:', this.formGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
