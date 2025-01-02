import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authendication.service';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})

export class AuthSigninComponent {
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
      this.authService.userLogin(this.signupForm.value).subscribe((data:any) => {
        this.response=data;
        this.router.navigate(['dashboard']);
      },(err)=>{
        this.response=err.error;
        this.submitted=true;
        if (this.response.status == '401') {
          // Show invalid email or password error
          if (this.response.message.includes('email')) {
            this.f['email'].setErrors({ 'incorrect': true });
          }
          if (this.response.message.includes('password')) {
            this.f['password'].setErrors({ 'incorrect': true });
          }
        }
      })
    } else {
      this.submitted=true;
    }
  }
}
