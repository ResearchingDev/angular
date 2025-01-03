import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageClientService } from 'src/app/services/Manageclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  addClientForm!: FormGroup;
  submitted = false;
  public response:any;
  constructor(private ManageClientService: ManageClientService,private router: Router) {} 
  ngOnInit(): void {
    // Initialize the form
    this.addClientForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userrole: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addClientForm.controls;
  }
  onSubmit() {
    if (this.addClientForm.valid) {
      this.submitted=false;
      this.ManageClientService.addClient(this.addClientForm.value).subscribe((data) => {
        this.router.navigate(['client']);
      },(err)=>{
        this.response=err.error.error;
        this.submitted=true;
        if (this.response.detail.includes('email') && this.response.detail.includes('exists') ) {
          this.f['email'].setErrors({ 'exist': true });
        }
      });
    }else{
      this.submitted=true;

    }
  }
}
