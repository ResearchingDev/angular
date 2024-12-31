import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./authendication/auth-signin/auth-signin.component')
      },
      {
        path: 'auth/signup',
        loadComponent: () => import('./authendication/auth-signup/auth-signup.component').then(m => m.AuthSignupComponent)
      },
      {
        path: 'pages/dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
