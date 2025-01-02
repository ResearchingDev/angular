import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';

@NgModule({
  declarations: [AuthSignupComponent],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AuthenticationModule {}
