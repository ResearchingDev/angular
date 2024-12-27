import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/authendication.service';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})

export default class AuthSigninComponent {
  public response:any;
  signupForm!: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,private router: Router) {} 
  ngOnInit(): void {
    // Initialize the form
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
   // Submit method
   onSubmit() {
    if (this.signupForm.valid) {
      this.submitted=false;
      this.authService.userLogin(this.signupForm.value).subscribe((data) => {
        this.response=data;
        this.router.navigate(['auth/signup']);
      },(err)=>{
        this.response=err.error;
        this.submitted=true;
        if (this.response.code === '401') {
          // Show invalid email or password error
          if (this.response.message.includes('Email')) {
            this.f['email'].setErrors({ 'incorrect': true });
          }
          if (this.response.message.includes('Password')) {
            this.f['password'].setErrors({ 'incorrect': true });
          }
        }
      })
    } else {
      console.log('Form is not valid');
    }
  }
}
