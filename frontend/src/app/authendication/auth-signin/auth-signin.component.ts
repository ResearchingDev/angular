import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authendication.service';
import { AbstractControl, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastService} from 'ng-angular-popup';
import { Language } from 'src/app/common/centerlized/language.enum';

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
  Language = Language; 
  constructor(private toast: NgToastService,private authService: AuthService,private router: Router) {} 
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
        const api_token = this.response.user.token;
        localStorage.setItem('api_token', api_token);
        this.router.navigate(['dashboard']);
        this.toast.success(this.response.message, Language.SUCCESS, 3000);
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
