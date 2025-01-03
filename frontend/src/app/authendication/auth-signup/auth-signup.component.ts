import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/authendication.service';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.scss'
})
export class AuthSignupComponent {
  public response:any;
  signinForm!: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,private router: Router) {} 
  ngOnInit(): void {
    // Initialize the form
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;
  }
  // Submit method
  onSubmit() {
    if (this.signinForm.valid) {
      this.submitted=false;
      this.authService.userSignup(this.signinForm.value).subscribe((data) => {
        this.response=data;
        this.router.navigate(['client']);
      },(err)=>{
        this.response=err.error;
        this.submitted=true;
        if (this.response.code === '500') {
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
      this.submitted=true;
    }
  }
}
