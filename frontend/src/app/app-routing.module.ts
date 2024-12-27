import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./authendication/auth-signin/auth-signin.component')
      },
      {
        path: 'auth/signup',
        loadComponent: () => import('./authendication/auth-signup/auth-signup.component').then(m => m.AuthSignupComponent)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
